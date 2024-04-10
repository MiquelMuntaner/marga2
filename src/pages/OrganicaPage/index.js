import React, { useState } from 'react'
import { PageLayout } from '../../components/PageLayout'
import { ContainerDiv, InputText, StyledForm } from './styles'
import { Header } from '../../components/Header'
import { organicProcessor } from '../../tools/organicProcessor'

export const OrganicaPage = ({ setDarkMode }) => {
    const [SMILES, setSMILES] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        let result = organicProcessor(e.target[0].value)
        let smiles_output = ""
        console.log(result)

        for (let i = 0; i < result[0].carbons; i++) {

            // Afegint ramificiacions
            for (let k in result[1]) {
                for (let j in result[1][k].position) {
                    if (result[1][k].position[j] === i) {
                        smiles_output += "(" + "C".repeat(result[1][k].carbons) + ")"
                    }
                }
            }

            // Afegits doble i triple enllaç
            if (result[0].doubleBonds.includes(i)) {
                smiles_output += "="
            } else if (result[0].tripleBonds.includes(i)) {
                smiles_output += "#"
            }

            // Afegint cicles i carbonis
            smiles_output = smiles_output
                + "C"
                + (result[0].ciclo === true && i == 0 ? "1" : "")
                + (result[0].ciclo === true && i == result[0].carbons - 1 ? "1" : "")
        }

        drawMolecule(result)


        setSMILES(smiles_output)
    }

    const drawLine = (ctx, x1, y1, angle, bound = 1) => {
        const width = 1
        const stroke = "black"
        const line_length = 50
        const double_bond_difference = 4

        var x2 = Math.cos(angle) * line_length + x1
        var y2 = Math.sin(angle) * line_length + y1

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = width;
        ctx.stroke();

        if (bound == 2) {
            var x3 = Math.cos(angle) * (line_length - double_bond_difference) + x1 + double_bond_difference
            var y3 = Math.sin(angle) * (line_length - double_bond_difference) + y1 - double_bond_difference

            ctx.beginPath();
            ctx.moveTo(x1 + double_bond_difference, y1 - double_bond_difference);
            ctx.lineTo(x3, y3);
            ctx.strokeStyle = stroke;
            ctx.lineWidth = width;
            ctx.stroke();
        }

        return [x2, y2]
    }

    const drawMolecule = (data) => {
        const line_angle = Math.PI / 6
        const canvas = document.getElementById("mainOrganicCanvas")
        var ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, 500, 300)

        const total_length = Math.cos(line_angle) * 50 * (data[0].carbons - 1)

        let last_coordinates = [canvas.width / 2 - total_length / 2, 150]
        let angle = - line_angle
        for (let i = 0; i < data[0].carbons - 1; i++) {

            if (data[0].doubleBonds.includes(i)) {
                last_coordinates = drawLine(ctx, last_coordinates[0], last_coordinates[1], angle, 2)
            } else {
                last_coordinates = drawLine(ctx, last_coordinates[0], last_coordinates[1], angle)
            }
            angle = angle == line_angle ? - line_angle : line_angle
        }
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
                <canvas id='mainOrganicCanvas' width="500" height="300" style={{ backgroundColor: "white" }}></canvas>
                {/*<img src={`http://hulab.rxnfinder.org/smi2img/${encodeURIComponent(SMILES)}/?width=500&height=200`} alt="" />*/}
                <img src={`https://cactus.nci.nih.gov/chemical/structure/${encodeURIComponent(SMILES)}/image?width=250&height=250`}></img>
                <script type="text/javascript" src={`https://chemapps.stolaf.edu/jmol/jmol.php?model=${encodeURIComponent(SMILES)}&inline`}></script>
                <script type="text/javascript" src={`https://chemapps.stolaf.edu/jmol/jmol.php?model=${encodeURIComponent(SMILES)}&image2d&inline`}></script>
            </ContainerDiv>
        </PageLayout>
    )
}
