import React, { useEffect, useState } from "react";
import { Range } from "./styles";

export const RangeSlider = ({ max, min, step, inputValue, setInputValue }) => {

    const [show, setShow] = useState(false)

    const onInputChange = (e) => {
        setInputValue(e.target.value)
        const sliderValue = document.getElementById("sliderValue")
        sliderValue.style.left = (inputValue * 100 / max) + "%"
        setShow(true)
    }

    const onInputBlur = () => {
        const sliderValue = document.getElementById("sliderValue")
        setShow(false)
    }

    return <Range>
        <div>
            <span id="sliderValue" className={show ? "show" : ""} style={{ left: `${(inputValue - min) / (max - min) * 100}%` }}>{inputValue}</span>
        </div>
        <div>
            <div>{min}</div>
            <input onChange={onInputChange} onBlur={onInputBlur} onTouchEnd={onInputBlur} type="range" min={min} max={max} step={step} value={inputValue} />
            <div>{max}</div>
        </div>
    </Range>
}