import styled from "styled-components"

export const InputText = styled.input`
    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus, 
    &:-webkit-autofill:active  {
        transition: background-color 5000s;
        -webkit-text-fill-color: transparent !important;
    }
    z-index: 10000;
    width: 400px;
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 1.3rem;
    color: transparent;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;

    &::placeholder {
        color: transparent;
    }

    &:placeholder-shown ~ .form__label {
        font-size: 1.3rem;
        cursor: text;
        top: 20px;
    }    

    &:focus {
        .form_label {
            position: absolute;
            top: 0;
            display: block;
            transition: 0.2s;
            font-size: 1rem;
            color: #11998e;
            font-weight:700;    
        }
        
        
        padding-bottom: 6px;  
        font-weight: 700;
        border-width: 3px;
        border-image: linear-gradient(to right, #11998e, #38ef7d);
        border-image-slice: 1;
    }
    &:focus + .topText {
        font-weight: 700;
        padding-right: 2px;
    }
`

export const TopText = styled.div`
    position: absolute;
    display: flex;
    top: 22px;
    font-size: 1.3rem;
    color: #fff;
`

export const TextCursor = styled.div`
    height: 24px;
    width: 1px;
    background-color: white;
    margin: 0px 0px 3px 1px;
    transition: none;
    animation: textCursorAnimation 1s linear(1, 1) infinite;
    /*easing function*/
    animation-iteration-count: infinite;

    @keyframes textCursorAnimation {
        0% {background-color: white}
        50% {background-color: transparent}
        100% {background-color: white}
    }
`

export const Placeholder = styled.div`
    position: absolute;
    display: block;
    top: 22px;
    font-size: 1.3rem;
    color: #fff;
    opacity: 30%;
`