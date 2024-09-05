import styled from "styled-components";

export const NavbarContainer = styled.div`
    overflow: hidden;
    margin: 0;
    padding: 0;
    font-weight: bold;
    font-size: 1.1921rem;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding-top: 10px;

    & > div > img {
        width: 46px;
        height: 46px;
        margin-top: 7px;
        margin-left: 40px;
    }

    & > div {
        min-height: 100%;
        display: flex;
        align-items: center;
    }

    & > div > p {
        padding-left: 20px;
        font-weight: 1000;
        margin: 0;
        font-size: 25px;
        color: ${props => props.theme.text};
        opacity: 90%;
    }

    & > ul {
        color: ${props => props.theme.text};
        margin: 0;
        padding: 0;
        padding-right: 40px;
        display: flex;

        @media only screen and (max-width: 480px) {
            justify-content: center;
        }
    }


    & > ul > li {
        list-style: none;
    }
    
    & > ul > li > a {
        position: relative;
        color: ${props => props.theme.text};
        display: block;
        padding: 20px 15px 20px 15px;
        transition: all 300ms;
        text-decoration: none;
    }

    & > ul > li > a::after {
        content: "";
        position: absolute;
        width: 0;
        margin: 0 4px;
        height: 3px;
        left: 0;
        bottom: 5px;
        background-color: ${props => props.theme.secondary};
        transition: all 0.5s ease;
    }

    & > ul > li > a:hover {
        color: ${props => props.theme.secondary};
    }
    
    & > ul > li > a:hover::after {
        width: calc(100% - 8px);
    }

    .active {
        color: #d3d3d3;
    }

    @media only screen and (max-width: 480px) {
        margin: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 15px;

        & > ul {
            padding: 0;
        }

        & > div {
            display: none;
        }
    }
`

export const ToggleDarkMode = styled.input`
    position: relative;
    appearance: none;
    outline: none;
    width: 55px;
    height: 25px;
    margin-top: 17px;
    border-radius: 20px;
    background: #c3c3c3;
    box-shadow: none;
    cursor: pointer;
    overflow: hidden;
    transition: 0.3s ease-in-out;

    &:checked {
        background: #8000c9;
    }

    &::before {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        border-radius: inherit;
        width: 15px;
        height: 15px;
        background: #ffff00;
        transition: inherit;
    }

    &::after {
        content: '';
        position: absolute;
        top: -1px;
        right: calc(100% + 36px);
        border-radius: inherit;
        width: 15px;
        height: 15px;
        background: #c3c3c3;
        transition: inherit;
    }

    &:checked::before {
        left: calc(100% - 21px);
        background: #cccccc;
    }

    &:checked::after {
        right: 12px;
        background: #8000c9;
    }
`