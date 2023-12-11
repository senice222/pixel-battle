import {makeAutoObservable} from "mobx";
import Pixel from "../tools/Pixel";

class ToolState {
    tool: Pixel | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool: Pixel) {
        this.tool = tool
    }

    setFillColor(fillColor: string) {
        if (this.tool) {
            this.tool.fillColor = fillColor
        }
    }
}

export default new ToolState()