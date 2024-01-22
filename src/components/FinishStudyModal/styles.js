import styled from "styled-components";

export const ModalContainer = styled.div`
    display: flex;
    z-index: 10000;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    align-items: center;
    justify-content: center;

    & > div {
        display: flex;
        flex-direction: column;
        gap: 30px;
        font-size: 30px;
        font-weight: bold;
        text-shadow: 3px 0px 7px rgba(81,67,21,0.8), 
	                -3px 0px 7px rgba(81,67,21,0.8), 
	                 0px 4px 7px rgba(81,67,21,0.8);
    }

    & > div > div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 50px;
    }

    & > div > div > button {
        margin-left: 20px;
        width: 100px;
        height: 40px;
        border-radius: 0;
        background-color: transparent;
        border: 2px solid #9b9b9b;
        color: #9b9b9b;
        transition: all 300ms;
    }

    & > div > div > button:hover {
        border-image-slice: 1;
        border-image-source: linear-gradient(#11998e, #38ef7d);
        color: white;
    }
`