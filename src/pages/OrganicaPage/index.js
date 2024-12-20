import React, { useEffect, useState } from 'react'
import { PageLayout } from '../../components/PageLayout'
import { ContainerDiv, InputText, StyledForm, Canvas, DownloadButton, ResetButton, RangeSliderLabel, RangeSliderContainer, InputDropdown } from './styles'
import { Header } from '../../components/Header'
import { organicProcessor } from '../../tools/organicProcessor'
import { RangeSlider } from '../../components/RangeSlider'
import { CookieBanner } from '../../components/CookieBanner'
import { getLocalStorage, setLocalStorage } from '../../tools/storageHelper'

export const OrganicaPage = ({ setDarkMode }) => {
    const [moleculeData, setMoleculeData] = useState("")
    const [SMILES, setSMILES] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [inputEmpty, setInputEmpty] = useState(true)
    const [searchHistory, setSearchHistory] = useState([])
    const [trueInputValue, setTrueInputValue] = useState("")
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
    const [lineLength, setLineLength] = useState(LINE_LENGTH)
    const [lineWidth, setLineWidth] = useState(LINE_WIDTH)
    const [doubleBondSpacing, setDoubleBondSpacing] = useState(DOUBLE_BOND_SPACING)



    useEffect(() => {
        CANVAS = document.getElementById("mainOrganicCanvas")
        CTX = CANVAS.getContext("2d")
    }, [SMILES])

    useEffect(() => {
        CANVAS = document.getElementById("mainOrganicCanvas")
        CTX = CANVAS.getContext("2d")
        let result = organicProcessor(inputValue)

        setMoleculeData(result)
        drawMolecule(result)
        generateSMILES(result)
    }, [lineAngle, lineLength, lineWidth, doubleBondSpacing])

    // Loading placeholder
    useEffect(() => {
        setInputValue(PLACEHOLDER)
        let result = organicProcessor(PLACEHOLDER)

        STROKE = "#d3d3d3"

        setMoleculeData(result)
        drawMolecule(result)

        STROKE = "black"

        if (window.matchMedia("(max-width: 480px)").matches) {
            console.log("innerWidth:", document.documentElement.clientWidth)
            let scale = parseInt(document.documentElement.clientWidth) * 0.76 / 1080

            document.getElementById("mainOrganicCanvas").style.transform = `scale(${scale})`
            document.getElementById("canvasDiv").style.width = parseInt(document.documentElement.clientWidth) * 0.76 + "px"
            document.getElementById("canvasDiv").style.height = `${parseInt(document.documentElement.clientWidth) * 0.76}px`
        }

        setSearchHistory(getLocalStorage("historialDeCerca", []))
    }, [])

    useEffect(() => {
        setLocalStorage("historialDeCerca", searchHistory)
        console.log("writing to local storage")
        console.log("Search values", searchHistory)
    }, [searchHistory])

    const addHistory = (newValue) => {
        if (!searchHistory.includes(newValue)) {
            setSearchHistory([...searchHistory, newValue])
            console.log("adding history")
        }
    }

    const removeFromHistory = (value) => {
        if (searchHistory.indexOf(value) > -1) {
            setSearchHistory(searchHistory.filter((item) => {
                return item !== value
            }))
        }
    }

    const handleInputAdd = (valueInput) => {
        setInputValue(valueInput)
        document.getElementById("inputText").value = valueInput

        CANVAS = document.getElementById("mainOrganicCanvas")
        CTX = CANVAS.getContext("2d")
        let result = organicProcessor(valueInput)

        setMoleculeData(result)
        drawMolecule(result)
        generateSMILES(result)
    }

    const resetValues = (e) => {
        e.preventDefault()
        setLineAngle(DEFAULT_ANGLE)
        setLineLength(LINE_LENGTH)
        setLineWidth(LINE_WIDTH)
        setDoubleBondSpacing(DOUBLE_BOND_SPACING)

        CANVAS = document.getElementById("mainOrganicCanvas")
        CTX = CANVAS.getContext("2d")
        let result = organicProcessor(inputValue)

        setMoleculeData(result)
        drawMolecule(result)
        generateSMILES(result)
    }

    const handleSubmit = (e) => {
        CANVAS = document.getElementById("mainOrganicCanvas")
        CTX = CANVAS.getContext("2d")
        e.preventDefault()
        setInputValue(e.target[0].value)
        let result = organicProcessor(e.target[0].value)

        addHistory(e.target[0].value)
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
        CTX.lineWidth = lineWidth;
        CTX.stroke();
    }

    const drawCarbon = (x0, y0, angle, bond = 1, ciclo_angle = 0) => {
        let temp_double_bond_spacing = doubleBondSpacing

        if (angle >= 0) {
            temp_double_bond_spacing = temp_double_bond_spacing * Math.tan(Math.PI / 2 - angle)
        }

        var x1 = Math.cos(angle) * lineLength + x0
        var y1 = Math.sin(angle) * lineLength + y0

        // Dibuixant la línia principal
        drawLine(x0, y0, x1, y1)

        if (bond == 2 || bond == 3) {
            console.log("part1")

            /*
            if (angle > Math.PI * 1.5) {
                angle = -(angle - Math.PI * 1.5)
            } else if (angle > Math.PI) {
                angle = -(angle - Math.PI)
            }
            if (angle <= 0) {
                var x2 = Math.cos(angle) * (lineLength - 2 * doubleBondSpacing) + x0
                var y2 = Math.sin(angle) * (lineLength - 2 * doubleBondSpacing) + (y0 - temp_double_bond_spacing)
            } else {
                var x2 = Math.cos(angle) * (lineLength - 2 * doubleBondSpacing) + (x0 + temp_double_bond_spacing)
                var y2 = Math.sin(angle) * (lineLength - 2 * doubleBondSpacing) + y0
            }

            let bondx0 = x0 + (angle >= 0 ? temp_double_bond_spacing : 0)
            let bondy0 = y0 - (angle <= 0 ? temp_double_bond_spacing : 0)

            */

            let boundx0, boundy0, boundx1, boundy1 = 0

            console.log("angle: ", angle)
            if (ciclo_angle !== 0) {

                const k = Math.round(2 * Math.PI / ciclo_angle); let increment = 0.3; let a = 0; for (let i = 0; i <= k; i++) {
                    a = (i > 4 ? a + increment : a)
                    increment = (i >= 5 ? increment - 0.1 : increment)
                }

                const EPSILON = ciclo_angle / 2
                const H = doubleBondSpacing / Math.sin(EPSILON)
                const MU = 2 * Math.PI - angle - EPSILON - a

                boundx0 = x0 + Math.cos(MU) * H
                boundy0 = y0 - Math.sin(MU) * H

                boundx1 = x1 + Math.cos(MU - ciclo_angle) * H
                boundy1 = y1 - Math.sin(MU - ciclo_angle) * H

            } else if (angle == Math.PI / 2 || angle == -Math.PI / 2) {
                console.log("angle 0")
                boundx0 = x0 + doubleBondSpacing
                boundy0 = y0

                boundx1 = x1 + doubleBondSpacing
                boundy1 = y1
            } else {
                if (angle > Math.PI * 1.5) {
                    angle = -(angle - Math.PI * 1.5)
                } else if (angle > Math.PI) {
                    angle = -(angle - Math.PI)
                }
                if (angle <= 0) {
                    boundx1 = Math.cos(angle) * (lineLength - 2 * doubleBondSpacing) + x0
                    boundy1 = Math.sin(angle) * (lineLength - 2 * doubleBondSpacing) + (y0 - temp_double_bond_spacing)
                } else {
                    boundx1 = Math.cos(angle) * (lineLength - 2 * doubleBondSpacing) + (x0 + temp_double_bond_spacing)
                    boundy1 = Math.sin(angle) * (lineLength - 2 * doubleBondSpacing) + y0
                }

                boundx0 = x0 + (angle >= 0 ? temp_double_bond_spacing : 0)
                boundy0 = y0 - (angle <= 0 ? temp_double_bond_spacing : 0)
            } /*else if (angle > 0 && angle < Math.PI / 2) {
                boundx0 = x0
                boundy0 = y0 + doubleBondSpacing / Math.sin(Math.PI / 2 - angle)

                boundx1 = x1 - doubleBondSpacing / Math.sin(angle)
                boundy1 = y1
            } else if (angle > Math.PI / 2 && angle < Math.PI) {
                boundx0 = x0 - doubleBondSpacing / Math.sin(Math.PI - angle)
                boundy0 = y0

                boundx1 = x1
                boundy1 = y1 + doubleBondSpacing / Math.sin(Math.PI / 2 - angle)
            } else if (angle > Math.PI && angle < Math.PI*1.25) {
                boundx0 = xo-doubleBondSpacing/Math.sin(angle-Math.PI)
                boundy0 = yo

                boundx1 = x1
                boundy1 = y1 + doubleBondSpacing/Math.cos(Math.PI-angles)
            } else if (angle > Math.PI && )*/

            // drawLine(bondx0, bondy0, x2, y2)
            drawLine(boundx0, boundy0, boundx1, boundy1)
        }


        if (bond == 3) {

            console.log("part2")
            if (angle <= 0) {
                temp_double_bond_spacing = -doubleBondSpacing * Math.tan(Math.PI / 2 - angle)
            } else {
                temp_double_bond_spacing = doubleBondSpacing
            }

            if (angle <= 0) {
                var x2 = x1
                //var y2 = Math.sin(angle) * (lineLength - 2 * doubleBondSpacing) + (y0 - temp_double_bond_spacing)
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

        CTX.fillStyle = '#F2F3F4'
        CTX.fillRect(x0, y0, rectangle_width, rectangle_height)

        // Drawing text
        CTX.font = "bold 35px 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";
        CTX.fillStyle = "black"
        CTX.fillText(text, x - textWidth / 2, y + textHeight / 2)
    }
    const drawMolecule = (data) => {
        console.log("DATA: ", data)
        // CTX.clearRect(0, 0, 1080, 1080)
        CANVAS = document.getElementById("mainOrganicCanvas")
        CTX = CANVAS.getContext("2d")
        CTX.fillStyle = "#F2F3F4";
        CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);

        let TOTAL_LENGTH = Math.cos(lineAngle) * lineLength * (data[0].carbons - 1)
        if (data[0].eter !== null || data[0].ester !== null) {
            TOTAL_LENGTH = TOTAL_LENGTH + Math.cos(lineAngle) * lineLength
        }


        const CICLO_ANGLE = (2 * Math.PI) / data[0].carbons

        // drawLine(540, 0, 540, 1080)
        // drawLine(0, 540, 1080, 540)

        let last_coordinates = [CANVAS.width / 2 - TOTAL_LENGTH / 2, CANVAS.height / 2]
        let oxigen_coord = []

        if (data[0].ciclo == true) {
            let rad_circumcicle = (lineLength / (2 * Math.sin(Math.PI / (data[0].carbons))))
            last_coordinates = [
                (CANVAS.width / 2),
                (CANVAS.height / 2) - rad_circumcicle
            ]
        }

        let all_coordinates = [last_coordinates]
        let angle = - lineAngle
        let ciclo_angle_acumulated = Math.PI / 2 - CICLO_ANGLE

        if (data[0].aldehid == true) {
            TOTAL_LENGTH = TOTAL_LENGTH + Math.cos(lineAngle) * lineLength
            oxigen_coord = last_coordinates

            last_coordinates = drawCarbon(last_coordinates[0], last_coordinates[1], angle, 2,
                (data[0].ciclo == true ? CICLO_ANGLE : 0)
            )

            angle = angle == lineAngle ? - lineAngle : lineAngle

            drawText(oxigen_coord[0], oxigen_coord[1], "O")
        }

        if (data[0].acidCarboxilic == true || data[0].amida == true) {
            TOTAL_LENGTH = TOTAL_LENGTH + Math.cos(lineAngle) * lineLength
            let oxigen_coord = last_coordinates

            last_coordinates = drawCarbon(last_coordinates[0], last_coordinates[1], angle, 1,
                (data[0].ciclo == true ? CICLO_ANGLE : 0)
            )

            angle = angle == lineAngle ? - lineAngle : lineAngle

            if (data[0].acidCarboxilic == true) {
                drawText(oxigen_coord[0], oxigen_coord[1], "HO")
            } else {
                drawText(oxigen_coord[0], oxigen_coord[1], "NH₂")
            }

            let angle_ramificacio = (data[0].ciclo == true) ?
                ciclo_angle_acumulated - 2 * CICLO_ANGLE : // Angle de la ramificació si és un cicle
                (angle <= 0 ? Math.PI / 2 : -Math.PI / 2) // Angle de la ramificiació si no és un cicle

            let extra_coord = drawCarbon(last_coordinates[0], last_coordinates[1], angle_ramificacio, 2)
            drawText(extra_coord[0], extra_coord[1], "O")
        }

        for (let i = 0; i < data[0].carbons - 1; i++) {

            if (data[0].ciclo == true) {
                angle = ciclo_angle_acumulated
            }

            if (data[0].ester == i + 2) {
                last_coordinates = drawCarbon(last_coordinates[0], last_coordinates[1], angle, 1,
                    (data[0].ciclo == true ? CICLO_ANGLE : 0)
                )

                let angle_ramificacio = (data[0].ciclo == true) ?
                    ciclo_angle_acumulated - 2 * CICLO_ANGLE : // Angle de la ramificació si és un cicle
                    (angle <= 0 ? -Math.PI / 2 : Math.PI / 2) // Angle de la ramificiació si no és un cicle
                let extra_coord = drawCarbon(last_coordinates[0], last_coordinates[1], angle_ramificacio, 2)
                drawText(extra_coord[0], extra_coord[1], "O")
                angle = angle == lineAngle ? - lineAngle : lineAngle
            }

            if (data[0].ester == i + 1) {
                oxigen_coord = last_coordinates
            }

            if (data[0].ester == i) {
                drawText(oxigen_coord[0], oxigen_coord[1], "O")
            }

            for (let element in data[0].extra) {

                if (data[0].extra[element][1] == i + 1) {

                    // Hidrocarburs halogenats
                    if (["Cl", "Br", "I", "F", "OH", "N"].includes(data[0].extra[element][0])) {
                        let angle_ramificacio = (data[0].ciclo == true) ?
                            ciclo_angle_acumulated - 2 * CICLO_ANGLE : // Angle de la ramificació si és un cicle
                            (angle <= 0 ? Math.PI / 2 : -Math.PI / 2) // Angle de la ramificiació si no és un cicle
                        if (i == 0 && data[0].ciclo == false) {
                            angle_ramificacio = Math.PI - angle
                            data[0].extra[element][0] = data[0].extra[element][0].replace("OH", "HO")
                        }

                        let extra_coord = drawCarbon(last_coordinates[0], last_coordinates[1], angle_ramificacio)
                        drawText(extra_coord[0], extra_coord[1], data[0].extra[element][0])
                    } else if (data[0].extra[element][0] == "cetona") {
                        let angle_ramificacio = (data[0].ciclo == true) ?
                            ciclo_angle_acumulated - 2 * CICLO_ANGLE : // Angle de la ramificació si és un cicle
                            (angle <= 0 ? Math.PI / 2 : -Math.PI / 2) // Angle de la ramificiació si no és un cicle
                        let extra_coord = drawCarbon(last_coordinates[0], last_coordinates[1], angle_ramificacio, 2)
                        drawText(extra_coord[0], extra_coord[1], "O")
                    }
                }
            }

            // Cercant ramificacions, en cas de que n'hi hagi es dibuixa
            for (let k in data[1]) {
                for (let j in data[1][k].position) {

                    if (data[1][k].position[j] - 1 === i) {
                        let angle_ramificacio = (data[0].ciclo == true) ?
                            ciclo_angle_acumulated - CICLO_ANGLE : // Angle de la ramificació si és un cicle
                            (angle <= 0 ? Math.PI / 2 : -Math.PI / 2) // Angle de la ramificiació si no és un cicle

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

            let eter_coordinates = []
            console.log("DRAWSING A FUCKING ETER ME CAC AMB TOT", data[0].eter)
            if (data[0].eter == i + 1) {
                last_coordinates = drawCarbon(last_coordinates[0], last_coordinates[1], angle)
                eter_coordinates = last_coordinates
                ciclo_angle_acumulated += CICLO_ANGLE
                angle = angle == lineAngle ? - lineAngle : lineAngle
                all_coordinates.push(last_coordinates)
            }

            last_coordinates = drawCarbon(last_coordinates[0], last_coordinates[1], angle,
                (data[0].doubleBonds.includes(i + 1) ? 2 : (
                    data[0].tripleBonds.includes(i + 1) ? 3 : null
                )),
                (data[0].ciclo == true ? CICLO_ANGLE : 0)
            )

            if (data[0].eter == i + 1) {
                drawText(eter_coordinates[0], eter_coordinates[1], "O")
            }


            ciclo_angle_acumulated += CICLO_ANGLE
            angle = angle == lineAngle ? - lineAngle : lineAngle
            all_coordinates.push(last_coordinates)
        }


        // Tornant a repetir el proces per les ramificacions del darrrer carboni
        for (let element in data[0].extra) {

            if (data[0].extra[element][1] == data[0].carbons) {
                // Hidrocarburs halogenats
                if (["Cl", "Br", "I", "F", "OH"].includes(data[0].extra[element][0])) {
                    let angle_ramificacio = (data[0].ciclo == true) ?
                        ciclo_angle_acumulated - 2 * CICLO_ANGLE : // Angle de la ramificació si és un cicle
                        (angle <= 0 ? Math.PI / 2 : -Math.PI / 2) // Angle de la ramificiació si no és un cicle
                    if (data[0].ciclo == false) {
                        angle_ramificacio = angle
                    }

                    let extra_coord = drawCarbon(last_coordinates[0], last_coordinates[1], angle_ramificacio)
                    drawText(extra_coord[0], extra_coord[1], data[0].extra[element][0])
                }
            }
        }



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
        CTX.font = "bold 35px 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";
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
        CANVAS = document.getElementById("mainOrganicCanvas")
        CTX = CANVAS.getContext("2d")
        var link = document.createElement('a');
        link.download = `${inputValue}.png`;
        link.href = CANVAS.toDataURL()
        link.click();
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        setInputValue(e.target.value)
        if (e.target.value.length === 0) {
            setInputEmpty(true)
        } else {
            setInputEmpty(false)
        }
    }

    const [testInputValue, setTestInputValue] = useState(0)
    return (
        <PageLayout setDarkMode={setDarkMode}>
            <ContainerDiv>
                <div>
                    <Header subheader="Orgànica" />
                    <StyledForm empty={inputEmpty} data-text={inputValue} onSubmit={handleSubmit}>
                        <label htmlFor="formula" className='form_label' id='inorganica_label'>Nom</label>
                        <InputText id="inputText" type="text" onChange={handleInputChange} placeholder={"2,3-dimetilpent-2-è"} />
                        <InputDropdown>
                            {searchHistory.filter(item => {
                                const searchTerm = inputValue.toLowerCase()
                                const molecule = item.toLowerCase()

                                return searchTerm && searchTerm !== molecule && molecule.startsWith(searchTerm)
                            }).map((item) => (
                                <div>
                                    <button onClick={() => handleInputAdd(item)}>{item}</button>
                                    <button onClick={() => removeFromHistory(item)}>x</button>
                                </div>
                            ))}
                        </InputDropdown>
                        <input type="submit" value="Executar"></input>
                    </StyledForm>
                    {SMILES !== "" ? <RangeSliderContainer>
                        <div>
                            <RangeSliderLabel>Angle</RangeSliderLabel>
                            <RangeSlider max={1.57} min={0} inputValue={lineAngle} step={0.01} setInputValue={setLineAngle} />
                            <RangeSliderLabel>Longitud de línia</RangeSliderLabel>
                            <RangeSlider max={200} min={0} inputValue={lineLength} step={1} setInputValue={setLineLength} />
                        </div>
                        <div>

                            <RangeSliderLabel>Grossor</RangeSliderLabel>
                            <RangeSlider max={10} min={1} inputValue={lineWidth} step={0.05} setInputValue={setLineWidth} />
                            <RangeSliderLabel>Separació dels dobles enllaços</RangeSliderLabel>
                            <RangeSlider max={30} min={1} inputValue={doubleBondSpacing} step={0.05} setInputValue={setDoubleBondSpacing} />
                        </div>
                    </RangeSliderContainer> : <></>}
                    {!window.matchMedia("(max-width: 480px)").matches ?
                        <>{SMILES !== "" ?
                            <>
                                {/*<p style={{ fontWeight: "normal" }}>Nomenclatura SMILES: <b>{SMILES}</b></p>*/}
                                <DownloadButton onClick={downloadButtonPressed}>Descarrega</DownloadButton>
                                <ResetButton onClick={resetValues}>Restaurar</ResetButton>
                            </>
                            : <div style={{ height: "91px" }} />
                        }</> : <></>
                    }
                </div>
                <div id='canvasDiv'>
                    <Canvas id='mainOrganicCanvas' width="1080" height="1080" style={{ backgroundColor: "white" }}></Canvas>
                </div>
                <div>
                    {SMILES !== "" && window.matchMedia("(max-width: 480px)").matches ?
                        <>
                            {/*<p style={{ fontWeight: "normal" }}>Nomenclatura SMILES: <b>{SMILES}</b></p>*/}
                            <DownloadButton onClick={downloadButtonPressed}>Descarrega</DownloadButton>
                            <ResetButton onClick={resetValues}>Restaurar</ResetButton>
                        </>
                        : <></>
                    }
                </div>
            </ContainerDiv>
        </PageLayout >
    )
}
