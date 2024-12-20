import styled from "styled-components";

export const MainContainer = styled.div`

`

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: calc(50vh - 195px);
    background-color: #F2F3F4;
    & h1 {
        font-weight: normal;
        width: 900px;
        font-size: 65px;
        padding: 0;
        margin: 0;
    }

    & h2 {
        margin: 20px 0 20px 0;
        font-weight: normal;
        font-size: 24px;
        width: 700px;
        color: #B0B0B0;
    }

    & h1 b {
        font-size: 80px;
    }

    & > div {
        margin-top: 20px;
    }

    & > div > button:first-child {
        margin-right: 150px;
    }

    & div button {
        border-radius: 10px;
        padding: 15px 110px 15px 20px;
        font-size: 18px;
        border: none;
        color: ${props => props.theme.text};
        box-shadow: -5px -5px 9px #FDFDFD, 5px 5px 7px #5e687949;
        white-space: nowrap;
        cursor: pointer;
        transition: all 400ms;
        overflow: hidden;
        font-weight: bold;
        width: 310px;
    }

    & div button span {
        font-weight: normal;
        display: inline-block;
        transform: translateX(-250px);
        opacity: 0;
        transition: opacity 0.4s;
    }

    & div button:hover {
        background-color: ${props => props.theme.main};
        color: white;
        padding: 15px 20px 15px 20px;
    }

    & div button:hover span {
        transform: translateX(0);
        opacity: 1;
    }
`

export const FalseInputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    
    & h2 {
        width: 50vw;
        font-size: 50px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 50px;
        height: 200px;
        width: 100%;
        background-color: #F2F3F4;
        margin: 0;
    }

    & div {
        background-color: #F2F3F4;
        position: relative;
        z-index: 10000;
        box-shadow: -5px -5px 9px #FDFDFD, 5px 5px 7px #5e687949;
        width: 50vw
    }

    & div p{
        padding-left: 50px;
        text-align: left;
        letter-spacing: 10px;
        font-family: monospace;
        font-size: 20px;
        width: 350px;
        border-right: 5px solid;
        white-space: nowrap;
        overflow: hidden;
    }
    
    p.visible {
        animation: typing 2s steps(16), cursor .4s step-end infinite alternate;
    }

    @keyframes cursor {
        50% { border-color: transparent }
    }

    @keyframes typing {
        from { width: 0 }
    }
`

export const OrganicaContainer = styled.div`
    padding-top: 67px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    
    & img {
        position: relative;
        z-index: 1;
        width: 30vw;
        box-shadow: -5px -5px 9px #FDFDFD, 5px 5px 7px #5e687949;
        opacity: 0%;
    }

    & img.visible {
        opacity: 100%;
    }
`

// CREA PAGINA 404 PENSEI