
class Pixel {
    canvas: HTMLCanvasElement;
    socket?: WebSocket;
    sessionId?: string;
    ctx: CanvasRenderingContext2D | null;
    lastDrawTimestamp: number;
    setTimerFlag?: (flag: boolean) => void;

    constructor(canvas: HTMLCanvasElement, socket?: WebSocket, sessionId?: string, setTimerFlag?: (flag: boolean) => void) {
        this.canvas = canvas;
        this.socket = socket;
        this.sessionId = sessionId;
        this.ctx = canvas.getContext('2d');
        this.lastDrawTimestamp = 0;
        this.setTimerFlag = setTimerFlag;
        this.listen();
    }

    listen() {
        this.canvas.onmousedown = this.handleMouseDown.bind(this);
    }

    set fillColor(color: string) {
        if (this.ctx) {
            this.ctx.fillStyle = color
        }
    }

    handleMouseDown(e: MouseEvent) {
        const currentTimestamp = Date.now()

        if (currentTimestamp - this.lastDrawTimestamp > 60000 && this.ctx && this.socket && this.setTimerFlag) {
            const x = e.clientX - this.canvas.getBoundingClientRect().left
            const y = e.clientY - this.canvas.getBoundingClientRect().top

            this.socket.send(
                JSON.stringify({
                    method: 'draw',
                    id: '/',
                    figure: {
                        type: 'pixel',
                        x,
                        y,
                        color: this.ctx.fillStyle,
                    },
                })
            )

            this.drawPixel(x, y)
            this.lastDrawTimestamp = currentTimestamp
            this.setTimerFlag(true)
        }
    }

    drawPixel(x: number, y: number) {
        if (this.ctx) {
            this.ctx.fillStyle = this.fillColor;

            const pixelSize = 5;
            this.ctx.fillRect(x, y, pixelSize, pixelSize);
        }
    }

    static staticDraw(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
        ctx.fillStyle = color
        ctx.fillRect(x, y, 5, 5);
    }
}

export default Pixel;