import styled from "styled-components";

export const NavbarContainer = styled.div`
    margin: 0;
    padding: 0;
    color: white;
    font-weight: bold;


    & > ul {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: flex-start;
        margin-left: 20px;
        margin-right: 20px;

        @media only screen and (max-width: 480px) {
            justify-content: center;
        }
    }

    & > ul > li {
        list-style: none;
    }
    
    & > ul > li > a {
        color: white;
        display: block;
        padding: 20px 15px 20px 15px;
        transition: all 300ms;
        text-decoration: none;
    }

    & > ul > li > a:hover {
        color: #38ef7d;
    }

    .active {
        color: #d3d3d3;
    }
`