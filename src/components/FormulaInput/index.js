import React, { useEffect, useState } from 'react'
import { InputText, TopText, TextCursor } from './styles'


export const FormulaInput = ({ inputText }) => {
    const [cursorPosition, setCursorPosition] = useState(0)
    const [focused, setFocused] = React.useState(false)

    const onFocus = () => {
        console.log("focus")
        setFocused(true)
        let inputLength = inputText.current.value.length
        inputText.current.setSelectionRange(inputLength, inputLength)
    }
    const onBlur = () => setFocused(false)

    /*
    useEffect(() => {
        console.log("holala")
        setCursorPosition(inputText.current.selectionStart)
        console.log("fff", inputText.current.selectionStart)
    }, [inputText])
    */

    const handleKeyUp = (e) => {
        let inputLength = inputText.current.value.length
        inputText.current.setSelectionRange(inputLength, inputLength)
        console.log("hola", cursorPosition)
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
