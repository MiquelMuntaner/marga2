import React, { useEffect } from 'react'
import { LayoutDiv } from './styles'
import { Footer } from '../Footer'
import { Navbar } from '../Navbar'

export const PageLayout = ({ setDarkMode, children }) => {

    useEffect(() => {
        setDarkMode(true)
    }, [])

    return (
        <>
            <LayoutDiv>
                <Navbar setDarkMode={setDarkMode} />
                {children}
            </LayoutDiv>
            <Footer />
        </>
    )
}