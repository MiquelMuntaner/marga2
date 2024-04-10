import styled from "styled-components";

export const ContainerDiv = styled.div`
    display: flex;
    height: calc(100% - 79px);
    width: 50vw;
    margin: 0 25% 10% 25%;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media only screen and (max-width: 480px) {
        width: 80%;
        margin: 0 10% 0 10%;
    }

    & > div {
        width: 100%;
        color: white;
        font-size: 1.3rem;
        text-align: left;
        margin-top: 15px;
    }
    
    & > div:nth-last-child(1) {
        display: flex;
        align-items: center;
        padding-bottom: 69px;
        position: relative;
    }

    & > div > span {
        font-weight: 700;
    }

    & > div > span > sub {
        vertical-align: baseline;
        position: relative;
        top: 0.25rem;
    }
`

export const StyledForm = styled.form`
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 100%;
    display: flex;


    & > img {
        width: 12px;
        height: 12px;
        position: absolute;
        left: 70px;
        top: 4px;
        filter: invert(65%) sepia(1%) saturate(0%) hue-rotate(138deg) brightness(95%) contrast(88%);
        transition: all 300ms;
    }

    & > img:hover {
        filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(76deg) brightness(107%) contrast(100%);
        cursor: pointer;
    }

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

export const TempResult = styled.span`
    display: block;
    // min-height: 98px;
    height: 177px;
`

export const QuestionMarkButton = styled.button`
    position: relative;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9b9b9b;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    border: 2px solid #9b9b9b;
    font-weight: bold;
    font-size: 12px;
    margin-left: 10px;
    transition: all 300ms;
    user-select: none;

    &:hover {
        color: white;
        border-color: white;
        cursor: pointer;
    }
`

export const MoleculalMassDiv = styled.div` 
    position: absolute;
    left: 110px;
    top: 30px;
    & > div:nth-child(1) {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & > div:nth-child(1) > div {
        top: -0px;
        width: 0; 
        height: 0; 
        border-left: 12px solid #9b9b9b;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent; 
        rotate: 270deg;
    }

    & > div:nth-child(2) {
        display: flex;
        border-radius: 10px;
        flex-direction: column;
        width: 170px;
        align-items: center;
        justify-content: center;
        gap: 0;
        border: 2px solid #9b9b9b;
        padding: 15px;
    }

    & > div:nth-child(2) > div {
        margin: 0 15% 0 15%;
        width: 70%;
        display: flex;
        justify-content: space-between;
        align-content: space-around;
    }

    & > div:nth-child(2) > div > p {
        margin: 0;
    }

    & > div:nth-child(2) > div > p:nth-child(1) {
        font-weight: bold;
    }
`