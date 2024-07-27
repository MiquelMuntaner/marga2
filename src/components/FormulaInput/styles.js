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
    transition: font-weight 300ms;

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
            // color: #11998e;
            color: ${props => props.theme.text};
            font-weight:700;    
        }
        
        
        padding-bottom: 6px;  
        font-weight: 700;
        border-width: 3px;
        border-color: ${props => props.theme.secondary};
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
    color: ${props => props.theme.text};
`

export const TextCursor = styled.div`
    height: 20px;
    width: 1px;
    background-color: ${props => props.theme.text};
    color: ${props => props.theme.text};
    margin: 0px 0px 3px 1px;
    transition: none;
    animation: textCursorAnimation 1s linear(1, 1) infinite;
    /*easing function*/
    animation-iteration-count: infinite;

    @keyframes textCursorAnimation {
        0% {background-color: ${props => props.theme.text}}
        50% {background-color: transparent}
        100% {background-color: ${props => props.theme.text}}
    }
`

export const Placeholder = styled.div`
    position: absolute;
    display: block;
    top: 22px;
    font-size: 1.3rem;
    color: #9b9b9b;
    opacity: 30%;
`