import styled from "styled-components";

export const NavbarContainer = styled.div`
    margin: 0;
    padding: 0;
    font-weight: bold;
    font-size: 1.1921rem;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding-top: 10px;

    & > div {
        min-height: 100%;
        display: flex;
        align-items: center;
    }

    & > div > p {
        padding-left: 40px;
        font-weight: 1000;
        margin: 0;
        font-size: 30px;
        color: white;
        opacity: 90%;
    }

    & > ul {
        color: rgba(255, 255, 255, 0.75);
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