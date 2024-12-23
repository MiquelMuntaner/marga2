import styled from "styled-components";

export const MainContainer = styled.div`
    width: 100%;
    height: calc(100vh - 69px - 78px);
    display: flex;
    align-items: center;
    justify-content: center;

    & h1 {
        font-size: 120px;
        text-align: left;
        margin-bottom: 0px;
    }

    & p {
        width: 50vw;
        font-size: 30px;
        text-align: left;
    }

    & div div {
        width: 100%;
        display: block;
        text-align: left;
    }

    & button {
        margin-top: 10px;
        margin-bottom: calc(69px + 69px);
        width: 200px;
        height: 50px;
        border-radius: 25px;
        background-color: ${props => props.theme.main};
        color: white;
        font-weight: bold;
        border: none;
        transition: all 300ms;
        font-size: 19px;
    }

    & button:hover {
        border: none;
        background-color: ${props => props.theme.secondary};
    }
`