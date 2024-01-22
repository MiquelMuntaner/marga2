import React from 'react'
import { Button } from './styles'

export const SelectStudyButton = ({ children, onClick }) => {
    return (
        <Button onClick={onClick}>
            {children}
        </Button>
    )
}
