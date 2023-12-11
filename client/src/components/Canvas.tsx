import style from '../styles/Home.module.scss'
import Toolbar from "./Toolbar.tsx";
import {useRef, useState, useEffect} from "react";
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState.ts";
import {Button, Modal} from "react-bootstrap";
import toolState from '../store/toolState.ts';
import Pixel from '../tools/Pixel.ts';
import {handleDraw} from '../utils/handleDraw.ts';
import TimerDisplay from "./TimerDisplay.tsx";

const Canvas = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null)
    const [modal, setModal] = useState<boolean>(true)
    const [timerFlag, setTimerFlag] = useState<boolean>(false);
    const [timerCount, setTimerCount] = useState<number>(60);

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket('ws://localhost:5000');
            canvasState.setSocket(socket)
            canvasState.setSessionId('/')

            if (!canvasRef.current) return;
            toolState.setTool(new Pixel(canvasRef.current, socket, '/', setTimerFlag))
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id: '/',
                    username: canvasState.username,
                    method: "connection"
                }))
            }
            socket.onmessage = (e) => {
                let msg = JSON.parse(e.data)
                switch (msg.method) {
                    case "connection":
                        console.log(`user connected ${msg.username}`)
                        break
                    case "draw":
                        handleDraw(msg, canvasRef)
                        break;
                }
            }
        }
    }, [canvasState.username]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timerFlag) {
                setTimerCount((prev) => prev - 1);
            }

            if (timerCount === 0) {
                setTimerFlag(false);
                setTimerCount(60)
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timerFlag, timerCount]);

    const connectHandler = () => {
        if (!usernameRef.current) return;
        canvasState.setUsername(usernameRef.current.value)
        setModal(false)
    }

    return (
        <div className={style.canvasContainer}>
            <Toolbar/>
            <TimerDisplay timerCount={timerCount} />
            <Modal show={modal} onHide={() => {
            }}>
                <Modal.Header>
                    <Modal.Title>Введите ваше имя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={usernameRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => connectHandler()}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas
                ref={canvasRef}
                className={style.canvas}
                width={1920}
                height={1080}
            />
        </div>
    );
});

export default Canvas;
