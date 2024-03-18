import React from 'react'
import { PageLayout } from '../../components/PageLayout'
import { ContainerDiv, InputText, StyledForm } from './styles'
import { Header } from '../../components/Header'
import { organicProcessor } from '../../tools/organicProcessor'

export const OrganicaPage = ({ setDarkMode }) => {
    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(e.target[0].value)
        organicProcessor(e.target[0].value)
    }

    return (
        <PageLayout setDarkMode={setDarkMode}>
            <ContainerDiv>
                <Header subheader="Orgànica" />
                <StyledForm onSubmit={handleSubmit}>
                    <label htmlFor="formula" className='form_label' id='inorganica_label'>Nom</label>
                    <InputText type="text" />
                    <input type="submit" value="Executar"></input>
                </StyledForm>
            </ContainerDiv>
        </PageLayout>
    )
}
