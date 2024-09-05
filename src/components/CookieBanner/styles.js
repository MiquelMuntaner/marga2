import styled from "styled-components";

export const BannerContainer = styled.div`
    position: fixed;
    bottom: 40px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: -5px -5px 9px #FDFDFD, 5px 5px 7px #5e687949;
    width: fit-content;
    margin: auto;
    padding: 10px 30px;
    border-radius: 50px;
    z-index: 100;

    & > div {
        margin-left: 30px;
    }

    & > div > button:first-child {
        margin-right: 15px;
    }

    & > div > button {
        width: fit-content;
        padding-left: 15px;
        padding-right: 15px;
        height: 40px;
        border-radius: 25px;
        background-color: ${props => props.theme.main};
        color: white;
        font-weight: bold;
        border: none;
        transition: all 300ms;
    }

    & > div > button:hover {
        background-color: ${props => props.theme.secondary};
    }

    & a:hover {
        color: ${props => props.theme.secondary};
    }
`