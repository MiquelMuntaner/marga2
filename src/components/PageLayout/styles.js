import styled from "styled-components";

export const LayoutDiv = styled.div`
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    flex: 1;

    @media only screen and (max-width: 480px) {
        flex: auto;
        height: auto;
    }
`