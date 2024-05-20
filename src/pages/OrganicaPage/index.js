import React, { useState } from 'react'
import { PageLayout } from '../../components/PageLayout'
import { ContainerDiv, InputText, StyledForm, Canvas } from './styles'
import { Header } from '../../components/Header'
import { organicProcessor } from '../../tools/organicProcessor'

export const OrganicaPage = ({ setDarkMode }) => {
    const [SMILES, setSMILES] = useState("")

    // Definint constants
    // ADVERTENCIA: no modificar els valors per defecta sense entendre el funcionament del programa

    const STROKE = "black" // Estils de la línia
    const LINE_WIDTH = 2 // Grossor de la línia
    const CANVAS = document.getElementById("mainOrganicCanvas") // Etiqueta de canvas
    const CTX = CANVAS.getContext("2d") // Context del canvas
    const DOUBLE_BOND_SPACING = 12 // Espai entra la línia princpial i la línia del doble enllaç (px)
    const LINE_LENGTH = 100 // Longitud de la línia que representa els carbonis (px)
    const DEFAULT_ANGLE = Math.PI / 5 // Angle per defecta entre les línies (menys en cas de raminificacions) (rad)


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

    const drawLine = (x1, y1, x2, y2) => {
        CTX.beginPath();
        CTX.moveTo(x1, y1);
        CTX.lineTo(x2, y2);
        CTX.strokeStyle = STROKE;
        CTX.LINE_WIDTH = LINE_WIDTH;
        CTX.stroke();
    }

    const drawCarbon = (x1, y1, angle, bond = 1) => {
        let temp_double_bond_spacing = DOUBLE_BOND_SPACING

        if (angle >= 0) {
            temp_double_bond_spacing = temp_double_bond_spacing * Math.tan(Math.PI / 2 - angle)
        }

        var x2 = Math.cos(angle) * LINE_LENGTH + x1
        var y2 = Math.sin(angle) * LINE_LENGTH + y1

        drawLine(x1, y1, x2, y2)

        if (bond == 2 || bond == 3) {
            if (angle <= 0) {
                var x3 = Math.cos(angle) * (LINE_LENGTH - 2 * DOUBLE_BOND_SPACING) + x1
                var y3 = Math.sin(angle) * (LINE_LENGTH - 2 * DOUBLE_BOND_SPACING) + (y1 - temp_double_bond_spacing)
            } else {
                var x3 = Math.cos(angle) * (LINE_LENGTH - 2 * DOUBLE_BOND_SPACING) + (x1 + temp_double_bond_spacing)
                var y3 = Math.sin(angle) * (LINE_LENGTH - 2 * DOUBLE_BOND_SPACING) + y1
            }

            let bondX1 = x1 + (angle >= 0 ? temp_double_bond_spacing : 0)
            let bondY1 = y1 - (angle <= 0 ? temp_double_bond_spacing : 0)
            drawLine(bondX1, bondY1, x3, y3)
        }

        if (bond == 3) {
            if (angle <= 0) {
                var x3 = Math.cos(angle) * (LINE_LENGTH - 2 * DOUBLE_BOND_SPACING) + x1
                var y3 = Math.sin(angle) * (LINE_LENGTH - 2 * DOUBLE_BOND_SPACING) + (y1 - temp_double_bond_spacing)
            } else {
                var x3 = Math.cos(angle) * (LINE_LENGTH - 2 * DOUBLE_BOND_SPACING) + (x1)
                var y3 = y2
            }

            let bondX1 = x1 - (angle <= 0 ? temp_double_bond_spacing : 0)
            let bondY1 = y1 + (angle >= 0 ? temp_double_bond_spacing : 0)
            drawLine(bondX1, bondY1, x3, y3)

        }


        return [x2, y2]
    }

    const drawMolecule = (data) => {
        CTX.clearRect(0, 0, 1080, 1080)
        const TOTAL_LENGTH = Math.cos(DEFAULT_ANGLE) * 100 * (data[0].carbons - 1)
        const CICLO_ANGLE = 2 * Math.PI / data[0].carbons

        let last_coordinates = [CANVAS.width / 2 - TOTAL_LENGTH / 2, CANVAS.height / 2]
        let angle = - DEFAULT_ANGLE
        let ciclo_angle_acumulated = CICLO_ANGLE

        for (let i = 0; i < data[0].carbons - 1; i++) {

            if (data[0].ciclo == true) {
                angle = ciclo_angle_acumulated
            }

            last_coordinates = drawCarbon(last_coordinates[0], last_coordinates[1], angle,
                data[0].doubleBonds.includes(i + 1) ? 2 : (
                    data[0].tripleBonds.includes(i + 1) ? 3 : null
                )
            )

            /*
            if (data[0].doubleBonds.includes(i + 1)) {
                last_coordinates = drawCarbon(last_coordinates[0], last_coordinates[1], angle, 2)
            } else if (data[0].tripleBonds.includes(i + 1)) {
                last_coordinates = drawCarbon(last_coordinates[0], last_coordinates[1], angle, 3)
            } else {
                last_coordinates = drawCarbon(last_coordinates[0], last_coordinates[1], angle)
            }
            */

            for (let k in data[1]) {

                for (let j in data[1][k].position) {

                    if (data[1][k].position[j] - 2 === i) {
                        let angle_ramificacio = (angle <= 0 ? -Math.PI / 2 + DEFAULT_ANGLE : Math.PI / 2 + DEFAULT_ANGLE)
                        let change_in_angle = true
                        let last_coordinates_ramificacio = drawCarbon(last_coordinates[0], last_coordinates[1], angle_ramificacio - DEFAULT_ANGLE)

                        for (let z = 1; z < data[1][k].carbons; z++) {
                            last_coordinates_ramificacio = drawCarbon(last_coordinates_ramificacio[0], last_coordinates_ramificacio[1], angle_ramificacio)
                            angle_ramificacio = (change_in_angle != true ? DEFAULT_ANGLE : - DEFAULT_ANGLE) + (angle <= 0 ? -Math.PI / 2 : Math.PI / 2)
                            change_in_angle = !change_in_angle
                            console.log(last_coordinates_ramificacio)
                        }
                    }
                }
            }

            ciclo_angle_acumulated += CICLO_ANGLE
            angle = angle == DEFAULT_ANGLE ? - DEFAULT_ANGLE : DEFAULT_ANGLE
        }

        if (data[0].ciclo == true) {
            drawCarbon(last_coordinates[0], last_coordinates[1], ciclo_angle_acumulated)
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
                <p style={{ fontWeight: "normal" }}>SMILES output: <b>{SMILES}</b></p>
                <Canvas id='mainOrganicCanvas' width="1080" height="1080" style={{ backgroundColor: "white" }}></Canvas>
                {/*<img src={`http://hulab.rxnfinder.org/smi2img/${encodeURIComponent(SMILES)}/?width=500&height=200`} alt="" />*/}
                {/*<img src={`https://cactus.nci.nih.gov/chemical/structure/${encodeURIComponent(SMILES)}/image?width=250&height=250`}></img>
                <script type="text/javascript" src={`https://chemapps.stolaf.edu/jmol/jmol.php?model=${encodeURIComponent(SMILES)}&inline`}></script>
    <script type="text/javascript" src={`https://chemapps.stolaf.edu/jmol/jmol.php?model=${encodeURIComponent(SMILES)}&image2d&inline`}></script>*/}
            </ContainerDiv>
        </PageLayout >
    )
}
