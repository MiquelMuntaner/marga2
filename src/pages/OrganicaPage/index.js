import React, { useState } from 'react'
import { PageLayout } from '../../components/PageLayout'
import { ContainerDiv, InputText, StyledForm } from './styles'
import { Header } from '../../components/Header'
import { organicProcessor } from '../../tools/organicProcessor'

export const OrganicaPage = ({ setDarkMode }) => {
    const [SMILES, setSMILES] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(e.target[0].value)
        let result = organicProcessor(e.target[0].value)
        console.log(result)

        let smiles_output = ""

        for (let i = 0; i < result[0].carbons; i++) {
            console.log(i)
            for (let k in result[1]) {
                if (result[1][k].position[0] === i) {
                    smiles_output += "(" + "C".repeat(result[1][k].carbons) + ")"
                }
            }
            if (result[0].doubleBonds.includes(i)) {
                smiles_output += "="
            } else if (result[0].tripleBonds.includes(i)) {
                smiles_output += "#"
            }

            smiles_output = smiles_output + "C"
        }



        console.log(`http://hulab.rxnfinder.org/smi2img/${encodeURIComponent(SMILES)}/?width=500&height=200`)
        setSMILES(smiles_output)
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
                <p>{SMILES}</p>
                <img src={`http://hulab.rxnfinder.org/smi2img/${encodeURIComponent(SMILES)}/?width=500&height=200`} alt="" />
            </ContainerDiv>
        </PageLayout>
    )
}
