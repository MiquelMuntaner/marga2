import styled from "styled-components";

export const MainContainer = styled.div`
    height: auto;
`

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: calc(50vh - 69px - 167px);
    padding-bottom: calc(50vh - 167px);
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

    @media only screen and (max-width: 480px) {
        padding-top: calc(50vh - 69px - 176px - 10px);
        & h1 {
            width: 80vw;
            font-size: 23px;
            padding: 0;
            margin: 0;
        }

        & h1 b {
            font-size: 55px;
        }

        & h2 {
            margin: 20px 0 20px 0;
            font-size: 17px;
            width: 80vw;
            color: #B0B0B0;
        }

        & > div {
            margin-top: 20px;
            display: flex;
            flex-direction: column
        }

        & > div > button:first-child {
            margin-right: 0px;
            margin-bottom: 40px;
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
    }
`

export const OrganicaContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    & div:first-child {
        width: 25vw;
        text-align: left;
    }

    & div:first-child h2 {
        font-size: 35px;
        font-weight: bold;
        margin: 0;
        padding: 0;
    }

    & div:first-child p {
        margin: 50px 0;
        font-size: 22px;
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

    & div:nth-child(2) {
        width: 30vw;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    & div:nth-child(2) p {
        text-align: left;

        width: 20vw;
        font-family: inherit;
        border: 0;
        border-bottom: 2px solid #9b9b9b;
        outline: 0;
        font-size: 19px;
        padding: 7px 0;
        background: transparent;

        padding-left: 5px;
        font-weight: 700;
        color: ${props => props.theme.text};
        border-width: 4px;
        margin-bottom: 0px;
        border-color: ${props => props.theme.secondary};
    }

    & div:nth-child(2) img {
        width: 340px;
        margin-top: 40px;
        box-shadow: -5px -5px 9px #FDFDFD, 5px 5px 7px #5e687949;
        transition: opacity 0.5s ease-in-out;
        opacity: 1;
        z-index: 100;
    }

    & div:nth-child(2) img.fade {
        opacity: 0;
    }

    & div:nth-child(2) img.blankImage {
        z-index: 0;
        position: absolute;
        bottom: -443px;
    }

    @media only screen and (max-width: 480px) {
        flex-direction: column;

        & div:first-child {
            width: 85vw;
            text-align: left;
        }

        & div:first-child h2 {
            font-size: 30px;
            font-weight: bold;
            margin: 0;
            padding: 0;
        }

        & div:first-child p {
            margin: 30px 0;
            font-size: 18px;
        }

        & div:nth-child(2) {
            width: 80vw;
        }

        & div:nth-child(2) p {
            width: 80vw;
            font-size: 19px;
        }

        & div:nth-child(2) img {
            width: 270px;
        }

        & div:nth-child(2) img.blankImage {
            position: relative;
            bottom: 310px;
        }
    }
`

export const InorganicaContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 35vh;
    margin-bottom: calc(50vh - 139px - 78px);

    & div:first-child {
        width: 30vw;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    & div:first-child > p {
        text-align: left;

        width: 20vw;
        font-family: inherit;
        border: 0;
        border-bottom: 2px solid #9b9b9b;
        outline: 0;
        font-size: 19px;
        padding: 7px 0;
        background: transparent;

        padding-left: 5px;
        font-weight: 700;
        color: ${props => props.theme.text};
        border-width: 4px;
        margin-bottom: 0px;
        border-color: ${props => props.theme.secondary};
    }

    & div:first-child > div {
        width: 18vw;
    }

    & div:first-child > div > p {
        font-size: 1.3rem;
        text-align: left;
        margin: 15px 0 0 0;
        
    }

    & div:first-child > div > p > span {
        font-weight: 700;
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
    }

    & div:first-child > div > p > span.inorganicaFade {
        opacity: 0;
    }

    & div:nth-child(2) {
        width: 30vw;
        text-align: left;
    }

    & div:nth-child(2) h2 {
        font-size: 35px;
        font-weight: bold;
        margin: 0;
        padding: 0;
    }

    & div:nth-child(2) p {
        margin: 30px 0;
        font-size: 22px;
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

    @media only screen and (max-width: 480px) {
        flex-direction: column-reverse;
        margin-top: -90px;

        & div:first-child {
            width: 85vw;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        & div:first-child > p {
            text-align: left;

            width: 75vw;
            font-size: 19px;
        }

        & div:first-child > div {
            width: 70vw;
        }

        & div:nth-child(2) {
            width: 85vw;
            text-align: left;
        }

        & div:nth-child(2) h2 {
            font-size: 30px;
            font-weight: bold;
            margin: 0;
            padding: 0;
        }

        & div:nth-child(2) p {
            font-size: 18px;
        }
    }

`

export const FalseInputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
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

    & img {
        width: 30vw;
        box-shadow: -5px -5px 9px #FDFDFD, 5px 5px 7px #5e687949;
    }
`