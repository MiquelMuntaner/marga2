import styled from "styled-components";

export const ExerciseContainer = styled.div`
    height: calc(100% - 59px);

    & > p {
        text-align: center;
        margin: 0 40px 0 0;
        padding-bottom: 5px;
    }
    
    & > p:last-child() {
        padding-top: 20px;
    }

    & > div > form > input {
        width: 300px;
        height: 40px;
        font-size: 25px;
        background-color: transparent;
        border: 0;
        border-bottom: 2px solid #9b9b9b;
        color: white;
        font-weight: normal;
        font-family: inherit;
        outline: 0;
        transition: all 300ms;
    }
    
    & > div > form > input:focus {
        font-weight: 700;
        outline: 0;
        border-image: linear-gradient(to right, #11998e, #38ef7d);
        border-image-slice: 1;
    }

    
    & > div > form > button, 
    & > button {
        margin-left: 20px;
        width: 100px;
        height: 40px;
        border-radius: 0;
        background-color: transparent;
        border: 2px solid #9b9b9b;
        color: #9b9b9b;
        transition: all 300ms;
    }
    
    & > button {
        width: 150px;
    }

    & > div > form > button:hover,
    & > button:hover {
        border-image-slice: 1;
        border-image-source: linear-gradient(#11998e, #38ef7d);
        color: white;
    }
`

export const QuestionDiv = styled.div`
    height: calc(100% - 24px - 24px - 24px - 24px - 59px);
    display: flex;
    gap: 30px;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    & > p {
        font-size: 30px;
        font-weight: bold;
    }
`

export const ClueDiv = styled.div`
    position: absolute;
    height: auto !important;
    display: flex;
    align-items: center;
    top: 70px;
    left: 60px;

    & > img {
        width: 28px;
        filter: invert(65%) sepia(1%) saturate(0%) hue-rotate(138deg) brightness(95%) contrast(88%);
        transition: all 300ms;
    }

    & > img:hover {
        filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(76deg) brightness(107%) contrast(100%);
    }

    & > p {
        margin: 0 0 0 20px;
        padding: 0;
        font-size: 19px;
    }
`