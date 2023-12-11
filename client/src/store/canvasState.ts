import {makeAutoObservable} from "mobx";

class CanvasState {
    canvas: HTMLCanvasElement | null = null;
    username: string = "";
    socket: WebSocket | null = null;
    sessionId?: string = ""

    constructor() {
        makeAutoObservable(this)
    }

    setSocket(socket: WebSocket) {
        this.socket = socket
    }

    setSessionId(sessionId?: string) {
        this.sessionId = sessionId
    }

    setUsername(username: string) {
        this.username = username;
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }


}

export default new CanvasState()