import styled from "styled-components";

export const FooterDiv = styled.div`
    color: ${props => props.theme.text};
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    bottom: 0;
    font-weight: 700;

    & p:first-child {
        text-align: left;
        opacity: 80%;
        margin: 0 20px 30px 40px;
    }

    & p:last-child {
        text-align: right;
        opacity: 80%;
        margin : 0 40px 30px 20px;
    }

    & p a {
        color: ${props => props.theme.text};
    }

    & p a:hover {
        color: ${props => props.theme.secondary};
    }

    @media only screen and (max-width: 480px) {
        position: relative;
        bottom: 0;
        margin-top: 20px;
        font-size: 11px;
    }
`