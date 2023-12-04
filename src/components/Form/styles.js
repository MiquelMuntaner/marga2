import styled from "styled-components";

export const ContainerDiv = styled.div`
    display: flex;
    width: 50vw;
    margin: 0 25% 0 25%;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    & > div {
        width: 100%;
        color: white;
        font-size: 1.3rem;
        text-align: left;
        margin-top: 15px;
    }

    & > div > span {
        font-weight: 700;
    }
`

export const StyledForm = styled.form`
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 100%;
    display: flex;

    & > label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 1rem;
        color: #9b9b9b;
    }

    & > input[type="submit"] {
        margin-left: 20px;
        width: 100px;
        border-radius: 0;
        background-color: transparent;
        border: 2px solid #9b9b9b;
        color: #9b9b9b;
    }

    & > input[type="submit"]:hover {
        border-image-slice: 1;
        border-image-source: linear-gradient(#11998e, #38ef7d);
        color: white;
    }
`

export const InputText = styled.input`
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
    animation-name: textCursorAnimation;
    animation-duration: 1s;
    transition: none;
    /*easing function*/
    animation-iteration-count: infinite;

    @keyframes textCursorAnimation {
        from {background-color: white}
        to {background-color: transparent}
    }
`