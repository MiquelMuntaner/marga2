import React, { useEffect, useState } from 'react'
import { PageLayout } from '../../components/PageLayout'
import { ContainerDiv, InputText, StyledForm, Canvas } from './styles'
import { Header } from '../../components/Header'
import { organicProcessor } from '../../tools/organicProcessor'

export const OrganicaPage = ({ setDarkMode }) => {
    const [moleculeData, setMoleculeData] = useState("")
    const [SMILES, setSMILES] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [inputEmpty, setInputEmpty] = useState(true)

    // Definint constants
    // ADVERTENCIA: no modificar els valors per defecte sense entendre el funcionament del programa

    let STROKE = "black" // Estils de la línia
    const LINE_WIDTH = 4 // Grossor de la línia
    let CANVAS  // Etiqueta de canvas
    let CTX // Context del canvas
    const DOUBLE_BOND_SPACING = 12 // Espai entra la línia princpial i la línia del doble enllaç (px)
    const LINE_LENGTH = 110 // Longitud de la línia que representa els carbonis (px)
    const DEFAULT_ANGLE = Math.PI / 5 // Angle per defecta entre les línies (menys en cas de raminificacions) (rad)
    const PLACEHOLDER = "2,3-dimetilpent-2-è"

    const [lineAngle, setLineAngle] = useState(DEFAULT_ANGLE)

    useEffect(() => {
        CANVAS = document.getElementById("mainOrganicCanvas")
        CTX = CANVAS.getContext("2d")
    }, [SMILES])

    // Loading placeholder
    useEffect(() => {
        setInputValue(PLACEHOLDER)
        let result = organicProcessor(PLACEHOLDER)

        STROKE = "#d3d3d3"

        setMoleculeData(result)
        drawMolecule(result)

        STROKE = "black"
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setInputValue(e.target[0].value)
        let result = organicProcessor(e.target[0].value)

        setMoleculeData(result)
        drawMolecule(result)
        generateSMILES(result)
    }

    const generateSMILES = (result) => {
        let smiles_output = ""

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

        setSMILES(smiles_output)
    }

    const drawLine = (x0, y0, x1, y1) => {
        CTX.beginPath();
        CTX.moveTo(x0, y0);
        CTX.lineTo(x1, y1);
        CTX.strokeStyle = STROKE;
        CTX.lineWidth = LINE_WIDTH;
        CTX.stroke();
    }

    const drawCarbon = (x0, y0, angle, bond = 1, ciclo_angle = 0) => {
        let temp_double_bond_spacing = DOUBLE_BOND_SPACING

        if (angle >= 0) {
            temp_double_bond_spacing = temp_double_bond_spacing * Math.tan(Math.PI / 2 - angle)
        }

        var x1 = Math.cos(angle) * LINE_LENGTH + x0
        var y1 = Math.sin(angle) * LINE_LENGTH + y0

        // Dibuixant la línia principal
        drawLine(x0, y0, x1, y1)

        if (bond == 2 || bond == 3) {

            /*
            if (angle > Math.PI * 1.5) {
                angle = -(angle - Math.PI * 1.5)
            } else if (angle > Math.PI) {
                angle = -(angle - Math.PI)
            }
            if (angle <= 0) {
                var x2 = Math.cos(angle) * (LINE_LENGTH - 2 * DOUBLE_BOND_SPACING) + x0
                var y2 = Math.sin(angle) * (LINE_LENGTH - 2 * DOUBLE_BOND_SPACING) + (y0 - temp_double_bond_spacing)
            } else {
                var x2 = Math.cos(angle) * (LINE_LENGTH - 2 * DOUBLE_BOND_SPACING) + (x0 + temp_double_bond_spacing)
                var y2 = Math.sin(angle) * (LINE_LENGTH - 2 * DOUBLE_BOND_SPACING) + y0
            }

            let bondx0 = x0 + (angle >= 0 ? temp_double_bond_spacing : 0)
            let bondy0 = y0 - (angle <= 0 ? temp_double_bond_spacing : 0)

            */

            let boundx0, boundy0, boundx1, boundy1 = 0

            if (ciclo_angle !== 0) {

                const k = Math.round(2 * Math.PI / ciclo_angle); let increment = 0.3; let a = 0; for (let i = 0; i <= k; i++) {
                    a = (i > 4 ? a + increment : a)
                    increment = (i >= 5 ? increment - 0.1 : increment)
                }

                const EPSILON = ciclo_angle / 2
                const H = DOUBLE_BOND_SPACING / Math.sin(EPSILON)
                const MU = 2 * Math.PI - angle - EPSILON - a

                boundx0 = x0 + Math.cos(MU) * H
                boundy0 = y0 - Math.sin(MU) * H

                boundx1 = x1 + Math.cos(MU - ciclo_angle) * H
                boundy1 = y1 - Math.sin(MU - ciclo_angle) * H

            } else if (angle > 0 && angle < Math.PI / 2) {
                boundx0 = x0
                boundy0 = y0 + DOUBLE_BOND_SPACING / Math.sin(Math.PI / 2 - angle)

                boundx1 = x1 - DOUBLE_BOND_SPACING / Math.sin(angle)
                boundy1 = y1
            } else if (angle > Math.PI / 2 && angle < Math.PI) {
                boundx0 = x0 - DOUBLE_BOND_SPACING / Math.sin(Math.PI - angle)
                boundy0 = y0

                boundx1 = x1
                boundy1 = y1 + DOUBLE_BOND_SPACING / Math.sin(Math.PI / 2 - angle)
            }

            // drawLine(bondx0, bondy0, x2, y2)
            drawLine(boundx0, boundy0, boundx1, boundy1)
        }


        if (bond == 3) {

            if (angle <= 0) {
                temp_double_bond_spacing = -DOUBLE_BOND_SPACING * Math.tan(Math.PI / 2 - angle)
            } else {
                temp_double_bond_spacing = DOUBLE_BOND_SPACING
            }

            if (angle <= 0) {
                var x2 = x1
                //var y2 = Math.sin(angle) * (LINE_LENGTH - 2 * DOUBLE_BOND_SPACING) + (y0 - temp_double_bond_spacing)
                var y2 = y1 - Math.tan(angle) * temp_double_bond_spacing
            } else {
                var x2 = x1 - (temp_double_bond_spacing / Math.tan(angle))
                var y2 = y1
            }

            let bondx0 = x0 + (angle <= 0 ? temp_double_bond_spacing : 0)
            let bondy0 = y0 + (angle >= 0 ? temp_double_bond_spacing : 0)
            drawLine(bondx0, bondy0, x2, y2)
        }


        return [x1, y1]
    }

    const drawText = (x, y, text) => {

        // Drawing white rectangle
        const PADDING_X = 10
        const PADDING_Y = 10
        let textWidth = CTX.measureText(text).width
        let textHeight = CTX.measureText(text).actualBoundingBoxAscent + CTX.measureText(text).actualBoundingBoxDescent


        let x0 = x - textWidth / 2 - PADDING_X
        let y0 = y - textHeight / 2 - PADDING_Y
        let rectangle_width = textWidth + 2 * PADDING_X
        let rectangle_height = textHeight + 2 * PADDING_Y
        console.log("x: ", x, "y: ", y)
        console.log("x0: ", x0, "y0: ", y0)

        CTX.fillStyle = 'white'
        CTX.fillRect(x0, y0, rectangle_width, rectangle_height)

        // Drawing text
        CTX.font = "bold 35px Roboto"
        CTX.fillStyle = "black"
        console.log("measure", CTX.measureText(text))
        CTX.fillText(text, x - textWidth / 2, y + textHeight / 2)
    }
    const drawMolecule = (data) => {

        // CTX.clearRect(0, 0, 1080, 1080)
        CANVAS = document.getElementById("mainOrganicCanvas")
        CTX = CANVAS.getContext("2d")
        CTX.fillStyle = "white";
        CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
        const TOTAL_LENGTH = Math.cos(lineAngle) * LINE_LENGTH * (data[0].carbons - 1)
        const CICLO_ANGLE = (2 * Math.PI) / data[0].carbons

        //drawLine(540, 0, 540, 1080)
        //drawLine(0, 540, 1080, 540)

        let last_coordinates = [CANVAS.width / 2 - TOTAL_LENGTH / 2, CANVAS.height / 2]

        if (data[0].ciclo == true) {
            let rad_circumcicle = (LINE_LENGTH / (2 * Math.sin(Math.PI / (data[0].carbons))))
            /*last_coordinates = [
                (CANVAS.width / 2) + LINE_LENGTH / 2,
                (CANVAS.height / 2) - rad_circumcicle
                ]*/
            last_coordinates = [
                (CANVAS.width / 2),
                (CANVAS.height / 2) - rad_circumcicle
            ]
        }

        let all_coordinates = [last_coordinates]
        let angle = - lineAngle
        let ciclo_angle_acumulated = Math.PI / 2 - CICLO_ANGLE

        for (let i = 0; i < data[0].carbons - 1; i++) {

            if (data[0].ciclo == true) {
                angle = ciclo_angle_acumulated
            }

            last_coordinates = drawCarbon(last_coordinates[0], last_coordinates[1], angle,
                (data[0].doubleBonds.includes(i + 1) ? 2 : (
                    data[0].tripleBonds.includes(i + 1) ? 3 : null
                )),
                (data[0].ciclo == true ? CICLO_ANGLE : 0)
            )

            // Cercant ramificacions, en cas de que n'hi hagi es dibuixa
            console.log(data[0])

            // Hidrocarburs halogenats

            for (let element in data[0].extra) {
                console.log("extra", data[0].extra[element])
                if (data[0].extra[element][1] == i + 2) {
                    let angle_ramificacio = (data[0].ciclo == true) ?
                        ciclo_angle_acumulated - CICLO_ANGLE : // Angle de la ramificació si és un cicle
                        (angle <= 0 ? -Math.PI / 2 : Math.PI / 2) // Angle de la ramificiació si no és un cicle
                    if (i == 0 && data[0].ciclo == false) {
                        angle_ramificacio = Math.PI / 2 - angle
                    }
                    console.log("drawing")
                    let extra_coord = drawCarbon(last_coordinates[0], last_coordinates[1], angle_ramificacio)
                    drawText(extra_coord[0], extra_coord[1], data[0].extra[element][0])
                }
            }

            console.log("iii", i)
            if (data[0].fluor.includes(i + 2)) {
                let angle_ramificacio = (data[0].ciclo == true) ?
                    ciclo_angle_acumulated - CICLO_ANGLE : // Angle de la ramificació si és un cicle
                    (angle <= 0 ? -Math.PI / 2 : Math.PI / 2) // Angle de la ramificiació si no és un cicle
                if (i == 0 && data[0].ciclo == false) {
                    angle_ramificacio = Math.PI / 2 - angle
                }
                console.log("drawing")
                let fluor_coord = drawCarbon(last_coordinates[0], last_coordinates[1], angle_ramificacio)
                drawText(fluor_coord[0], fluor_coord[1], "F")
            }

            /*
            if (data[0].brom.includes(i + 2)) {
                let angle_ramificacio = (data[0].ciclo == true) ?
                    ciclo_angle_acumulated - CICLO_ANGLE : // Angle de la ramificació si és un cicle
                    (angle <= 0 ? -Math.PI / 2 : Math.PI / 2) // Angle de la ramificiació si no és un cicle
                let brom_coord = drawCarbon(last_coordinates[0], last_coordinates[1], angle_ramificacio)
                drawText(brom_coord[0], brom_coord[1], "Br")
            }
            */

            if (data[0].clor.includes(i + 2)) {
                let angle_ramificacio = (data[0].ciclo == true) ?
                    ciclo_angle_acumulated - CICLO_ANGLE : // Angle de la ramificació si és un cicle
                    (angle <= 0 ? -Math.PI / 2 : Math.PI / 2) // Angle de la ramificiació si no és un cicle
                let clor_coord = drawCarbon(last_coordinates[0], last_coordinates[1], angle_ramificacio)
                drawText(clor_coord[0], clor_coord[1], "Cl")
            }

            if (data[0].iode.includes(i + 2)) {
                let angle_ramificacio = (data[0].ciclo == true) ?
                    ciclo_angle_acumulated - CICLO_ANGLE : // Angle de la ramificació si és un cicle
                    (angle <= 0 ? -Math.PI / 2 : Math.PI / 2) // Angle de la ramificiació si no és un cicle
                let iode_coord = drawCarbon(last_coordinates[0], last_coordinates[1], angle_ramificacio)
                drawText(iode_coord[0], iode_coord[1], "I")
            }

            for (let k in data[1]) {
                for (let j in data[1][k].position) {

                    if (data[1][k].position[j] - 2 === i) {
                        let angle_ramificacio = (data[0].ciclo == true) ?
                            ciclo_angle_acumulated - CICLO_ANGLE : // Angle de la ramificació si és un cicle
                            (angle <= 0 ? -Math.PI / 2 : Math.PI / 2) // Angle de la ramificiació si no és un cicle

                        let change_angle = true // Vertader si l'angle per defecte ha de ser invertit

                        // Dibuixam la primera línia verticalment i tenint en compte cap a quina direcció
                        let last_coordinates_ramificacio = drawCarbon(last_coordinates[0], last_coordinates[1], angle_ramificacio)

                        angle_ramificacio = angle_ramificacio + lineAngle
                        for (let z = 1; z < data[1][k].carbons; z++) {
                            last_coordinates_ramificacio = drawCarbon(last_coordinates_ramificacio[0], last_coordinates_ramificacio[1], angle_ramificacio)
                            angle_ramificacio = (change_angle != true ? lineAngle : - lineAngle) + (angle <= 0 ? -Math.PI / 2 : Math.PI / 2)
                            change_angle = !change_angle
                        }
                    }
                }
            }

            ciclo_angle_acumulated += CICLO_ANGLE
            angle = angle == lineAngle ? - lineAngle : lineAngle
            all_coordinates.push(last_coordinates)
        }
        console.log(all_coordinates)


        if (data[0].ciclo == true) {
            drawCarbon(last_coordinates[0], last_coordinates[1], ciclo_angle_acumulated,
                (data[0].doubleBonds.includes(data[0].carbons) ? 2 : (
                    data[0].tripleBonds.includes(data[0].carbons) ? 3 : null
                )),
                (data[0].ciclo == true ? CICLO_ANGLE : 0))
        }

        /*
        for (let i in all_coordinates) {
            for (let j in data[0].fluor) {
                console.log("fluoor", data[0].fluor)
                console.log("jjj", data[0].fluor[j], "iii", i)
                if (data[0].fluor[j] == i) {
                    console.log("drawing")
                    drawText(all_coordinates[i][0], all_coordinates[i][1], "F")
                }
            }
        }
            */


        drawWaterMark()
    }

    const drawWaterMark = () => {
        var text = "Nocions.cat"
        CTX.font = "bold 35px Roboto"
        CTX.fillStyle = "#3A4B4C"
        CTX.fillText(text, 200, 1000)

        const logoImg = new Image()

        logoImg.addEventListener("load", () => {
            CTX.drawImage(logoImg, 80, 930, 100, 100)
        })
        logoImg.src = "./assets/logo.png"

        /*
        for (let i = 0; i < 1080; i += 220) {
            for (let y = 0; y < 1080; y += 50) {
                var text = "M. Muntaner"
                CTX.font = "bold 35px Roboto"
                CTX.fillStyle = "rgba(58, 75, 76, 0.5)"
                CTX.fillText(text, i, y)
            }
        }
        s*/
    }


    const downloadButtonPressed = () => {
        var link = document.createElement('a');
        link.download = `${inputValue}.png`;
        link.href = CANVAS.toDataURL()
        link.click();
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
        if (e.target.value.length === 0) {
            setInputEmpty(true)
        } else {
            setInputEmpty(false)
        }
    }

    return (
        <PageLayout setDarkMode={setDarkMode}>
            <ContainerDiv>
                <div>
                    <Header subheader="Orgànica" />
                    <StyledForm empty={inputEmpty} data-text={inputValue} onSubmit={handleSubmit}>
                        <label htmlFor="formula" className='form_label' id='inorganica_label'>Nom</label>
                        <InputText type="text" onChange={handleInputChange} placeholder={"2,3-dimetilpent-2-è"} />
                        <input type="submit" value="Executar"></input>
                    </StyledForm>
                    {SMILES !== "" ?
                        <>
                            <p style={{ fontWeight: "normal" }}>Nomenclatura SMILES: <b>{SMILES}</b></p>
                            <button onClick={downloadButtonPressed}>Descarrega</button>
                        </>
                        : <div style={{ height: "91px" }} />
                    }
                </div>
                <div>
                    <Canvas id='mainOrganicCanvas' width="1080" height="1080" style={{ backgroundColor: "white" }}></Canvas>
                </div>
            </ContainerDiv>
        </PageLayout >
    )
}
