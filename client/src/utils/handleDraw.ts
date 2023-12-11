import {RefObject} from "react";
import Pixel from "../tools/Pixel";
import {Figure} from "../interfaces/Figure";

export const handleDraw = (msg: Figure, canvasRef: RefObject<HTMLCanvasElement>) => {
    const figure = msg.figure;
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    switch (figure.type) {
        case "pixel":
            Pixel.staticDraw(ctx, figure.x, figure.y, figure.color);
            break;
        case "Finish":
            ctx.beginPath();
            break;
    }
}
