import styled from "styled-components";

export const SelectStudySessionDiv = styled.div`
    height: calc(100% - 69px);
    width: 100%;

    & > p {
        margin: 0;
        font-size: 30px;
        padding-top: 80px;
        font-weight: bold;
    }

    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 40px;
        height: calc(100% - 69px - 115px);
    }
`

export const InorganicaFormContainer = styled.div`
    height: calc(100% - 69px);

    & > p {
        margin: 0;
        font-size: 30px;
        padding-top: 80px;
        font-weight: bold;
    }

    & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        height: calc(100% - 69px - 115px);
    }

    & > div > form {
        width: 25%;
    }

    & > div > form > div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        font-size: 16px;
        border-bottom: 1px solid #9b9b9b;
    }

    & > div > form > div:nth-last-child(2) {
        border-bottom: none
    }

    & > div > form > div > input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        height: 20px;
        width: 20px;
        background-color: #d5d5d5;
        border-radius: 4px;
        cursor: pointer;
        outline: none;
        transition: all 300ms;
    }

    & > div > form > div > input[type="checkbox"]:after{
        content: "";
        background: url("./assets/checked-icon.png");
        background-size: contain;
        background-repeat: no-repeat;
        width: 18px;
        height: 18px;
        margin-left: 1px;
        margin-top: 1px;
        display: none;
    }

    & > div > form > div > input[type="checkbox"]:hover {
        background-color: #a5a5a5;
    }

    & > div > form > div > input[type="checkbox"]:checked {
        background-color: #5bcd3e;
    }

    & > div > form > div > input[type="checkbox"]:checked:after{
        display: block;
    }

    & > div > form > button[type="submit"] {
        margin-top: 20px;
        width: 160px;
        height: 45px;
        border: none;
        border-radius: 5px;
        color: white;
        background-color: transparent;
        border: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 14px;
        transition: all 300ms;
    }

    & > div > form > button[type="submit"]:hover {
        -webkit-box-shadow: 5px 5px 24px -3px rgba(0,0,0,0.56);
        -moz-box-shadow: 5px 5px 24px -3px rgba(0,0,0,0.56);
        box-shadow: 5px 5px 24px -3px rgba(0,0,0,0.56);
    }
`

export const FinishScreenContainer = styled.div`
    display: flex;
    height: calc(100% - 69px);
    justify-content: center;
    align-content: center;
    flex-direction: column;
    font-weight: bold;
    font-size: 25px;
`