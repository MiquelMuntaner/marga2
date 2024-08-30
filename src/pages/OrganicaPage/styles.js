import styled from "styled-components"

export const ContainerDiv = styled.div`
    height: calc(100% - 70px - 70px);
    width: 100vw !important;
    text-align: center;
    display: grid;
    grid-template-columns: 12% 38% auto 432px 12%;
    align-content: center;
    justify-content: space-between;
    width: 50vw;
    color: white;
    font-weight: bold;
    font-size: 25px;
    margin-bottom: 70px;
    
    @media only screen and (max-width: 480px) {
        display: flex;
        flex-direction: column;
        padding: 0 10% 0 10%;
    }

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
        width: 120px;
        height: 40px;
        border-radius: 25px;
        background-color: ${props => props.theme.main};
        color: white;
        font-weight: bold;
        border: none;
        transition: all 300ms;
    }

    & > div:first-child > button:hover {
        background-color: ${props => props.theme.secondary};
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
        color: ${props => props.theme.text};
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
        width: 120px;
        height: auto;
        border-radius: 25px;
        background-color: ${props => props.theme.main};
        color: white;
        font-weight: bold;
        border: none;
        transition: all 300ms;
    }

    & > input[type="submit"]:hover {
        background-color: ${props => props.theme.secondary};
    }
    /*&::before {
        position: absolute;
        bottom: 10px;
        font-weight: normal;
        color: black;
        content: ${props => props.empty ? "" : "attr(data-text)"};
        transition: all 200ms;
    }

    &:focus-within::before {
        color: transparent;
    }*/
`

export const InputText = styled.input`
    /*webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus, 
    &:-webkit-autofill:active  {
        transition: background-color 5000s;
        -webkit-text-fill-color: transparent !important;
    }
    */
    z-index: 10000;
    width: 400px;
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 1.3rem;
    padding: 7px 0;
    font-weight: normal;
    background: transparent;
    // color: ${props => props.theme.text};
    // color: transparent;
    transition: border-color 0.2s;
    transition: color 300ms;
    transition: font-weight 300ms;
    margin-bottom: 2px;

    

    &::placeholder {
        font-weight: normal;
        color: #d3d3d3;
        opacity: 1;
    }

    &::-ms-input-placeholder { /* Edge 12 -18 */
        font-weight: normal;
        color: #d3d3d3;
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
        
        font-weight: 700;
        color: ${props => props.theme.text};
        border-width: 4px;
        margin-bottom: 0px;
        border-color: ${props => props.theme.secondary};
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
    border-radius: 50px;
    // box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    box-shadow: -5px -5px 9px #FDFDFD, 5px 5px 7px #5e687949;
    //border: 1px solid #333333;

    @media only screen and (max-width: 480px) {
        transform: scale(0.25);
        -ms-transform: scale(0.25); 
        -webkit-transform: scale(0.25);
        transform-origin: top left;
    }
`