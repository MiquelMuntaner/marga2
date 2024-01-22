import styled from "styled-components";

export const Button = styled.button`
    width: 20%;
    height: 15%;
    background-color: transparent;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 25px;
    color: white;
    font-size: 25px;
    transition: all 300ms;
    font-weight: bold;

    &:hover {
        -webkit-box-shadow: 5px 5px 24px -3px rgba(0,0,0,0.56);
        -moz-box-shadow: 5px 5px 24px -3px rgba(0,0,0,0.56);
        box-shadow: 5px 5px 24px -3px rgba(0,0,0,0.56);
    }
`