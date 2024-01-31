import React, { useRef, useState } from 'react'
import { data, exceptions, oxoacids } from '../../data'
import { ContainerDiv, MoleculalMassDiv, QuestionMarkButton, StyledForm, TempResult } from './styles'
import parse from 'html-react-parser'
import { intToRoman } from '../../tools/intToRoman'
import { splitFormula } from '../../tools/formulaSplitter'
import { FormulaInput } from '../FormulaInput'
import { Header } from '../Header'
import { nameSplitter } from '../../tools/nameSplitter'
import { calcHidroxids } from '../../tools/inorganicProcessor'
import { calcHidrursNoMetalics } from '../../tools/inorganicProcessor'
import { calcMassaMolar } from '../../tools/inorganicProcessor'
import { calcNombreOxidacio } from '../../tools/inorganicProcessor'
import { calcOxoacids } from '../../tools/inorganicProcessor'
import { calcOxosals } from '../../tools/inorganicProcessor'
import { calcPrefixosMultiplicadors } from '../../tools/inorganicProcessor'
import { romanToInt } from '../../tools/romanToInt'


export const Form = () => {
    const [result, setResult] = useState([])
    const [molarMass, setMolarMass] = useState(0)
    const [doFormula, setDoFormula] = useState(true)
    const [formulaSplitted, setFormulaSplitted] = useState([])
    const [showMolecularMassDiv, setShowMolecularMassDiv] = useState(false)
    const [typeOfFormula, setTypeOfFormula] = useState("")
    const inputText = useRef()
    const labelRef = useRef()

    const handleImgClick = (e) => {
        e.preventDefault()
        setDoFormula(!doFormula)
        setResult([])
        setShowMolecularMassDiv(false)
        setMolarMass(0)
        setTypeOfFormula("")
        inputText.current.value = ""
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setShowMolecularMassDiv(false)

        if (doFormula) {
            let processedFormula = splitFormula(e.target[0].value)
            let tempElement = {}
            console.log("processed formula", processedFormula)

            let formulaWithoutParentheses = []
            for (let i in processedFormula) {
                if (Object.prototype.toString.call(processedFormula[i]) === '[object Array]') {
                    for (let k in processedFormula[i]) {
                        if (k !== processedFormula[i].length - 1) {
                            // No estic segur de perquè aixó funciona, pero multiplica es nombre de molecules per es nombre d'atoms
                            tempElement = { ...processedFormula[i][k] }
                            formulaWithoutParentheses.push(tempElement)
                        }
                    }
                } else {
                    formulaWithoutParentheses.push(processedFormula[i])
                }
            }

            setFormulaSplitted(formulaWithoutParentheses)
            if (e.target[0].value === "") {
                setResult([])
            } else if (e.target[0].value in exceptions) {
                // Excepcions
                setResult([exceptions[e.target[0].value]])
                setTypeOfFormula("Excepció")

            } else if (e.target[0].value.includes("OH")) {
                // Hidroxids
                setResult([calcHidroxids(processedFormula)])
                setTypeOfFormula("Hidròxid (la nomenclatura preferent és la dels nombres d'oxidació)")

            } else if (formulaWithoutParentheses[1].letters == "H" && formulaWithoutParentheses[3]?.letters == "O") {
                // Sals àcides
                console.log("holaa")
                setResult([calcOxosals(processedFormula)])
                setTypeOfFormula("Sal àcida")

            } else if (processedFormula[0].letters == "H" && processedFormula[2]?.letters == "O") {
                // Oxoacids
                setResult([calcOxoacids(processedFormula)])
                setTypeOfFormula("Oxoàcid")

            } else if (formulaWithoutParentheses[2].letters == "O" && formulaWithoutParentheses.length >= 4) {
                // Oxosals
                setResult([calcOxosals(processedFormula)])
                setTypeOfFormula("Oxisal")

            } else if ((processedFormula[0].isMetall === true && processedFormula[1].isMetall === false)) {
                // Sals binaries, no metall + metall
                setResult([calcNombreOxidacio(processedFormula, e.target[0].value)])
                setTypeOfFormula("Sal binària (la nomenclatura preferent és la dels nombres d'oxidació)")

            } else if ((processedFormula[0].name === "hidrogen" && processedFormula[1].isMetall === false)) {
                // Hidrurs no metalics
                setResult([calcHidrursNoMetalics(processedFormula)])
                setTypeOfFormula("Hidrur no-metàl·lic")

            } else if (processedFormula[0].isMetall === false && processedFormula[1].isMetall === false) {
                // Combinacions de no metalls
                // setResult([`Prefixos: ${calcPrefixosMultiplicadors(processedFormula)}`, `Stock: ${calcNombreOxidacio(processedFormula)}`])
                setResult([calcPrefixosMultiplicadors(processedFormula)])
                setTypeOfFormula("Combinació entre no-metalls (la nomenclatura preferent és la dels prefixos multiplicadors)")
            }

            let massaMolar = calcMassaMolar(formulaWithoutParentheses)
            if (massaMolar <= 99) { massaMolar = "0" + massaMolar }

            setMolarMass(massaMolar)
        } else {
            nameSplitter(e.target[0].value)
            let splitedName = e.target[0].value.toLowerCase().split("'").join(" ").split(" ")
            let valence = 0

            // Seperant els nombres romans de la darrera paraula
            if (splitedName[splitedName.length - 1].split("(").length !== 1) {
                let lastElement = splitedName.pop()
                splitedName.push(lastElement.split("(")[0])
                valence = romanToInt(lastElement.split("(")[1].substring(0, lastElement.split("(")[1].length - 1).toUpperCase())
            }

            let finalHtmlText = ""
            let currentValue = ""
            // Simple codi per els oxoacids
            if (splitedName[0] == "àcid") {
                currentValue = calcOxoacisFormula(splitedName)

            } else {
                for (let i in data) {
                    // Sal binaria, combinacio metall + no metall
                    if (data[i].plusUrName.toLowerCase() === splitedName[0].toLowerCase() && valence !== 0) {
                        console.log("sal binaria aqui:", splitedName)
                        console.log("valence", valence)
                        currentValue = calcNombreOxidacioFormula(splitedName, valence)
                    }
                }
            }

            // Creant els nombres en subindex
            const hasNumber = /\d/;
            for (let i = 0; i < currentValue.length; i++) {
                if (hasNumber.test(currentValue[i])) {
                    finalHtmlText = `${finalHtmlText}<sub>${currentValue[i]}</sub>`
                } else {
                    finalHtmlText = `${finalHtmlText}${currentValue[i]}`
                }
            }
            setResult([finalHtmlText])
        }
    }

    const calcNombreOxidacioFormula = (splitedName, valence) => {
        let firstAtom = {}
        let secondAtom = {}

        // Extreim la informació de cada uns del atoms
        for (let i in data) {
            if (data[i].plusUrName.toLowerCase() === splitedName[0].toLowerCase()) {
                secondAtom = data[i]
                secondAtom["letters"] = i
            }

            if (data[i].name.toLowerCase() === splitedName[2].toLowerCase()) {
                firstAtom = data[i]
                firstAtom["letters"] = i
            }
        }

        // Asignam les valencies
        let atomCount = [secondAtom.valences[0], valence]

        // Simplificam
        if (atomCount[0] % 2 === 0 && atomCount[1] % 2 === 0) {
            atomCount = [atomCount[0] / 2, atomCount[1] / 2]
        }

        return firstAtom.letters
            + (atomCount[0] !== 1 ? atomCount[0] : "")
            + secondAtom.letters
            + (atomCount[1] !== 1 ? atomCount[1] : "")
    }

    const calcOxoacisFormula = (splitedName) => {
        let valence = 0
        let letter = ""
        let containsMeta = false


        if (splitedName[1].substring(0, 4) == "meta") {
            containsMeta = true
            splitedName[1] = splitedName[1].slice(4, splitedName[1].length)
        } else if (splitedName[1].substring(0, 4) == "orto") {
            splitedName[1] = splitedName[1].slice(4, splitedName[1].length)
        }

        for (let i in data) {
            // Verificam només els elements que contenen oxoacids
            if ("oxoAcidNames" in data[i]) {
                // Revisam tots els oxoacids de cada elements fins que un coincideixi
                for (let j in data[i]["oxoAcidNames"]) {
                    if (data[i]["oxoAcidNames"][j] == splitedName[splitedName.length - 1]) {
                        let valencesWithoutNegatives = data[i].valences.map((x) => {
                            if (x >= 0) { return x }
                        }).filter((x) => {
                            if (x !== undefined) { return x }
                        })

                        letter = i
                        console.log("letter", letter)
                        valence = valencesWithoutNegatives[j]
                    }
                }
            }
        }

        let newOxoacid = [0, 2, valence]

        // Simplificam
        if (newOxoacid[2] % 2 === 0) {
            newOxoacid = [0, 1, valence / 2]
        }

        // Excepcions
        if (["B", "P", "As", "Sb"].includes(letter) && containsMeta === false) {
            newOxoacid[0] = 6
            newOxoacid[2] = newOxoacid[2] + 3
        } else if (letter == "Si" && containsMeta === false) {
            newOxoacid[0] = 4
            newOxoacid[2] = newOxoacid[2] + 2
        } else {
            // Afegim H2O
            newOxoacid[0] = 2
            newOxoacid[2] = newOxoacid[2] + 1
        }


        // Simplificam
        if (newOxoacid[2] % 2 === 0 && newOxoacid[1] % 2 === 0) {
            newOxoacid = [newOxoacid[0] / 2, newOxoacid[1] / 2, newOxoacid[2] / 2]
        }

        return " H"
            + (newOxoacid[0] !== 1 ? newOxoacid[0] : "")
            + letter
            + (newOxoacid[1] !== 1 ? newOxoacid[1] : "")
            + "O"
            + (newOxoacid[2] !== 1 ? newOxoacid[2] : "")
    }


    const handleQuestionMarkButtonClick = (e) => {
        setShowMolecularMassDiv(!showMolecularMassDiv)
    }

    return (
        <ContainerDiv>
            <Header />
            <StyledForm id="form" onSubmit={handleSubmit}>
                <label htmlFor="formula" className='form_label' id='inorganica_label' ref={labelRef}>{doFormula ? "Fórmula" : "Nom"}</label>
                <img src="./assets/icono-rotar.png" alt="" onClick={handleImgClick} />
                <FormulaInput labelRef={labelRef} doFormula={doFormula} inputText={inputText} />
                <input type="submit" value="Executar" />
            </StyledForm>
            {result.length === 0 ? (<TempResult />) : result.map((i, key) => (<div key={key}>Resultat:&nbsp;<span>{parse(i.charAt(0).toUpperCase() + i.slice(1))}</span></div>))}
            {typeOfFormula !== "" ? <div>Tipus: <span>{typeOfFormula}</span></div> : ""}
            {
                molarMass !== 0 ?
                    <div>
                        Massa molar:&nbsp; <span>{molarMass.toString().replace(".", ",")}</span>
                        <QuestionMarkButton onClick={handleQuestionMarkButtonClick}>?</QuestionMarkButton>
                        {showMolecularMassDiv ?
                            <MoleculalMassDiv>
                                <div>
                                    <div />
                                </div>
                                <div>
                                    {formulaSplitted.map((i) => (
                                        (i.molarMass !== undefined && i.letters !== "" ? <p>{i.letters}: {i.molarMass}</p> : "")
                                    ))}
                                </div>
                            </MoleculalMassDiv> : ""
                        }
                    </div>
                    : ""
            }
        </ContainerDiv>
    )
}
