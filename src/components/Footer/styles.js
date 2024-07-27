import styled from "styled-components";

export const FooterDiv = styled.div`
    color: ${props => props.theme.text};
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    font-weight: 700;

    & > p {
        text-align: left;
        opacity: 80%;
        margin: 0 20px 30px 40px;
    }
`