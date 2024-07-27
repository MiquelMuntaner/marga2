import styled from "styled-components";

export const TitleContainer = styled.div`
    color: ${props => props.theme.text};
    
    & > h1 {
        // font-size: 4.236rem;
        font-size: 5rem;
        opacity: 85%;
        margin: 0 0 0 0;

        @media only screen and (max-width: 480px) {
            font-size: 4rem;
        }
    }

    & > h2 {
        margin: 0 0 50px 0;
        font-weight: normal;
        opacity: 75%;
        // font-size: 1.618;
        font-size: 2.4rem;

        @media only screen and (max-width: 480px) {
            font-size: 2.2rem;
        }
    }
`