import styled from "styled-components";

export const ContainerDiv = styled.div`
    display: flex;
    width: 50vw;
    margin: 0 25% 0 25%;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    & > div {
        width: 100%;
        color: white;
        font-size: 1.3rem;
        text-align: left;
        margin-top: 15px;
    }

    & > div > span {
        font-weight: 700;
    }
`

export const StyledForm = styled.form`
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 100%;
    display: flex;

    & > label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 1rem;
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
        color: white;
    }
`

