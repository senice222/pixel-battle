import {memo} from 'react';
import {TimerDisplayProps} from "../interfaces/Timer.ts";

const TimerDisplay = memo(({timerCount}: TimerDisplayProps) => {
    return <div>Time to draw: {timerCount === 0 ? 'Draw' : `${timerCount}`}</div>;
});

export default TimerDisplay;