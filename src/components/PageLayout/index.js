import React, { useEffect } from 'react'
import { LayoutDiv } from './styles'
import { Footer } from '../Footer'
import { Navbar } from '../Navbar'
import { GoogleAnalytics } from '../GoogleAnalytics'
import { CookieBanner } from '../CookieBanner'

export const PageLayout = ({ setDarkMode, children }) => {

    useEffect(() => {
        setDarkMode(true)
    }, [])

    return (
        <>
            <GoogleAnalytics GA_MEASUREMENT_ID={"G-D1DX631HCE"} />
            <LayoutDiv>
                <Navbar setDarkMode={setDarkMode} />
                {children}
            </LayoutDiv>
            <Footer />
            <CookieBanner />
        </>
    )
}