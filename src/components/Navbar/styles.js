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
        position: relative;
        color: white;
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
        background-color: #38ef7d;
        transition: all 0.5s ease;
    }

    & > ul > li > a:hover {
        color: #38ef7d;
    }
    
    & > ul > li > a:hover::after {
        width: calc(100% - 8px);
    }

    .active {
        color: #d3d3d3;
    }
`