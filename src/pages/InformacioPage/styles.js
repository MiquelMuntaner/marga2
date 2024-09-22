import styled from "styled-components";

export const InfoContainer = styled.div`
    font-size: 17px;
    padding: 2% 25% 5% 25%;
    text-align: left;
    overflow-x: hidden;
    width: 50vw;


    @media only screen and (max-width: 480px) {
        font-size: 15px;
        width: auto;
        padding: 0% 10% 0% 10%;
    }

    & > p {
        margin-right: 0;
        margin-left: 0;
        padding-right: 0;
        padding-left: 0;
    }

    & > h2 {
        margin-right: 0;
        margin-left: 0;
        padding-right: 0;
        padding-left: 0;
    }

    & > h3 {
        margin-right: 0;
        margin-left: 0;
        padding-right: 0;
        padding-left: 0;
    }

`