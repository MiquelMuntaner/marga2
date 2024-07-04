import styled from "styled-components"

export const ContainerDiv = styled.div`
    height: calc(100% - 79px - 34px);
    width: 100vw !important;
    text-align: center;
    display: grid;
    grid-template-columns: 12% 38% auto 432px 12%;
    align-content: center;
    justify-content: space-between;
    width: 50vw;
    padding-top: 34px;
    color: white;
    font-weight: bold;
    font-size: 25px;
    
    & > div {
        color: white;
        font-size: 1.3rem;
        margin-top: 15px;
    }

    
    & > div:nth-child(2) {
        //width: 432px;
        height: 432px;
        grid-column-start: 4;
        grid-column-end: 4;
        margin: 0;
    }

    & > div:first-child > button {
        width: 100px;
        height: 40px;
        border-radius: 0;
        background-color: transparent;
        border: 2px solid #9b9b9b;
        color: #9b9b9b;
    }

    & > div:first-child > button:hover {
        border-image-slice: 1;
        border-image-source: linear-gradient(#11998e, #38ef7d);
        color: rgba(255, 255, 255, 0.8);
    }

    & > div:first-child {
        grid-column-start: 2;
        grid-column-end:2;
        align-items: flex-start;
        text-align: left;
    }
    // SMILES
    & > div:first-child > p {
        margin: 15px 0 15px 0;
    } 
`

export const StyledForm = styled.form`
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    display: flex;

    & > label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 1.15rem;
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
        color: rgba(255, 255, 255, 0.8);
    }
`

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
    padding: 7px 0;
    background: transparent;
    color: white;
    transition: border-color 0.2s;

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
    &:focus {
        font-weight: 700;
        padding-right: 2px;
    }
`

export const Canvas = styled.canvas`
    transform: scale(0.4);
    -ms-transform: scale(0.4); 
    -webkit-transform: scale(0.4);
    transform-origin: top left;
    display: block;
    height: auto;
    padding: 0;
    margin: 0;
    border-radius: 25px;
`