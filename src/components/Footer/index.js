import React, { useEffect } from 'react'
import { FooterDiv } from './styles'
import { useLocation } from 'react-router'

export const Footer = () => {
    const { hash, pathname, search } = useLocation()

    useEffect(() => {
        if ((pathname == "/inorganica") && !window.matchMedia("(max-width: 480px)").matches) {
            console.log("pathname", pathname)
            document.getElementById("footerDiv").style.position = "absolute"
        }
    }, [])

    return (
        <FooterDiv id="footerDiv">
            <p>&#169;​Nocions, 2024<br />Versió 1.0.1 (estable)<br />Miquel Muntaner Barceló</p>
            <p>Un treball de recerca<br />de l'IES Felanitx<br /><a href="/informacio#privacitat">Política de privacitat</a></p>
        </FooterDiv>
    )
}
