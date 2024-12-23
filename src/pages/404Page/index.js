import React, { useEffect, useState, useRef } from 'react'
import { PageLayout } from '../../components/PageLayout'
import { useNavigate } from 'react-router'
import { MainContainer } from './styles'


export const Page404 = ({ setDarkMode }) => {
    const navigate = useNavigate()

    const onIniciClick = () => {
        navigate("/")
    }

    return (
        <PageLayout setDarkMode={setDarkMode}>
            <MainContainer>
                <div>
                    <h1>Error 404</h1>
                    <p>La pàgina va patir una reacció redox i va perdre tota la seva massa!</p>
                    <div>
                        <button onClick={onIniciClick}>Tornar a l'inici</button>
                    </div>
                </div>
            </MainContainer>
        </PageLayout>
    )
}