import React, { useEffect, useRef, useState } from 'react'
import { InputText, TopText, TextCursor, Placeholder } from './styles'


export const FormulaInput = ({ labelRef, doFormula, inputText }) => {
    const [focused, setFocused] = useState(false)


    const onFocus = () => {
        window.addEventListener("click", onClick)
        labelRef.current.style.color = "white"
        setFocused(true)
        setTimeout(function () {
            let inputLength = inputText.current.value.length
            inputText.current.setSelectionRange(inputLength, inputLength)
        }, 1);
    }

    const onBlur = () => {
        window.addEventListener("click", onClick)
        labelRef.current.style.color = "#9b9b9b"
        setFocused(false)
        window.removeEventListener("click", onClick)
    }

    const onClick = () => {
        if (inputText.current !== null) {
            let inputLength = inputText.current.value.length
            inputText.current.setSelectionRange(inputLength, inputLength)
        }
    }

    const handleKeyUp = (e) => {
        let inputLength = inputText.current.value.length
        inputText.current.setSelectionRange(inputLength, inputLength)
    }

    const onTextInputChange = (e) => {
        let finalHtmlText = ""
        const currentInputValue = e.target.value
        const hasNumber = /\d/;
        for (let i = 0; i < currentInputValue.length; i++) {
            if (hasNumber.test(currentInputValue[i])) {
                finalHtmlText = `${finalHtmlText}<sub>${currentInputValue[i]}</sub>`
            } else {
                finalHtmlText = `${finalHtmlText}${currentInputValue[i]}`
            }
        }

        document.getElementById("textFiller").innerHTML = `${finalHtmlText}`
    }

    return (
        <>
            <InputText onFocus={onFocus} onBlur={onBlur} onKeyUp={handleKeyUp} name='formula' type="text" className='inputText' onChange={onTextInputChange} ref={inputText} />
            {
                inputText.current?.value === "" && focused == false || inputText.current === undefined ?
                    <Placeholder>{doFormula ? <>Ca(H<sub>2</sub>PO<sub>4</sub>)<sub>2</sub></> : "Àcid perclòric"}</Placeholder> :
                    <TopText id="topText" className='topText'><div id="textFiller"></div>{focused == true ? <TextCursor /> : null}</TopText>
            }
        </>
    )
}
