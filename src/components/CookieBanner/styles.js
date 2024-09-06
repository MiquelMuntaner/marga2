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
    background-color: #F2F3F4; 
    z-index: 1000;

    & > div {
        margin-left: 30px;
    }

    & > div > button:first-child {
        margin-right: 15px;
        color: black;
        background-color: transparent;

    }

    & > div > button:first-child:hover {
        color: white;
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

    @media only screen and (max-width: 480px) {
        flex-direction: column;
        width: 80vw;
        bottom: 90px;

        & > div {
        margin-left: 0;
        }

        & > div > button:first-child {
            margin-right: 15px;
        }
    }
`