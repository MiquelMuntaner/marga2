import React, { useState } from 'react'
import { InputText, TopText, TextCursor } from './styles'


export const FormulaInput = ({ inputText }) => {
    const [focused, setFocused] = useState(false)

    const onFocus = () => {
        window.addEventListener("click", onClick)
        setFocused(true)
        setTimeout(function () {
            let inputLength = inputText.current.value.length
            inputText.current.setSelectionRange(inputLength, inputLength)
        }, 1);
    }

    const onBlur = () => {
        setFocused(false)
        window.removeEventListener("click", onClick)
    }

    const onClick = () => {
        let inputLength = inputText.current.value.length
        inputText.current.setSelectionRange(inputLength, inputLength)
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
            <TopText id="topText" className='topText'><div id="textFiller"></div>{focused == true ? <TextCursor /> : null}</TopText>
        </>
    )
}
