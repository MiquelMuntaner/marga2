import styled from "styled-components";

export const Range = styled.div`
    text-align: center;
    color: black;
    place-items: center;
    height: 50px;
    //width: 300px;
    width: calc(100% - 65px - 45px);
    border-radius: 10px;
    box-shadow: -5px -5px 9px #FDFDFD, 5px 5px 7px #5e687949;
    padding: 0 65px 0 45px;

    & > div:first-child {
        position: relative;
        width: 100%;
    }

    & > div:first-child span {
        position: absolute;
        height: 45px;
        width: 45px;
        /*background: ${props => props.theme.main};*/
        color: #fff;
        font-weight: 500;
        font-size: 14px;
        top: -40px;
        transform: translateX(-50%) scale(0);
        transform-origin: bottom;
        transition: transform 0.3 ease-in-out;
        line-height: 55px;
        z-index: 2;
    }

    & > div:first-child span.show{
        transform: translateX(-50%) scale(1);
    }

    & > div:first-child span:after {
        position: absolute;
        content: "";
        height: 45px;
        width: 45px;
        left: 50%;
        background: ${props => props.theme.main};
        transform: translateX(-50%) rotate(45deg);
        border: 3px solid #fff;
        z-index: -1;
        border-top-left-radius: 50%;
        border-top-right-radius: 50%;
        border-bottom-left-radius: 50%;
    }

    // Field
    & > div:nth-child(2) {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    & > div:nth-child(2) input {
        appearance: none;
        -webkit-appearance: none;
        height: 3px;
        width: 100%;
        background: #ddd;
        border-radius: 5px;
        outline: none;
        border: none;
    }

    & > div:nth-child(2) input::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 20px;
        width: 20px;
        background-color: ${props => props.theme.main};
        border-radius: 50%;
        border: 1px solid ${props => props.theme.main};
        cursor: pointer;
    }

    & > div:nth-child(2) > div {
        position: absolute;
        font-size: 18px;
        font-weight: 600;
        color: ${props => props.theme.main};
    }

    & > div:nth-child(2) > div:first-child {
        left: -25px;
    }

    & > div:nth-child(2) > div:last-child {
        right: -35px;
    }

    @media only screen and (max-width: 480px) {
        width: calc(100vw - 24vw - 50px - 30px);
        padding: 0 50px 0 30px;

        & > div:nth-child(2) > div:first-child {
        left: -18px;
    }

    & > div:nth-child(2) > div:last-child {
        right: -40px;
    }
    }
`