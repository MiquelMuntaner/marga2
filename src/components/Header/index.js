import React from 'react'
import { TitleContainer } from './styles'

export const Header = ({ subheader }) => {
    return (
        <TitleContainer>
            <h1>Nocions</h1>
            <h2>{subheader}</h2>
        </TitleContainer>
    )
}