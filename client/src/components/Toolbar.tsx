import style from '../styles/Toolbar.module.scss'
import toolState from "../store/toolState.ts";
import {ChangeEvent} from "react";

const Toolbar = () => {
    const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
        toolState.setFillColor(e.target.value)
    }

    return (
        <div className={style.toolbar}>
            Choose a color:
            <input style={{marginLeft: 10}} type="color" onChange={(e) => changeColor(e)} />
        </div>
    );
};

export default Toolbar;
