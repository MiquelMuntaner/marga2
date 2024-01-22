import React from 'react'
import { LayoutDiv } from './styles'
import { Footer } from '../Footer'
import { Navbar } from '../Navbar'

export const PageLayout = ({ children }) => {
    return (
        <>
            <LayoutDiv>
                <Navbar />
                {children}
            </LayoutDiv>
            <Footer />
        </>
    )
}