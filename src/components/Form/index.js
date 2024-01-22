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


export const Form = () => {
    const [result, setResult] = useState([])
    const [molarMass, setMolarMass] = useState(0)
    const [doFormula, setDoFormula] = useState(true)
    const [formulaSplitted, setFormulaSplitted] = useState([])
    const [showMolecularMassDiv, setShowMolecularMassDiv] = useState(false)
    const labelRef = useRef()

    const handleImgClick = (e) => {
        e.preventDefault()
        setDoFormula(!doFormula)
        setResult([])
        setShowMolecularMassDiv(false)
        setMolarMass(0)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setShowMolecularMassDiv(false)
        if (doFormula) {
            let processedFormula = splitFormula(e.target[0].value)
            setFormulaSplitted(processedFormula)
            if (e.target[0].value === "") {
                setResult([])
            } else if (e.target[0].value in exceptions) {
                // Excepcions
                setResult([exceptions[e.target[0].value]])
            } else if (e.target[0].value.includes("OH")) {
                // Hidroxids
                setResult([calcHidroxids(processedFormula)])
            } else if (processedFormula[1].letters == "H" && processedFormula[3]?.letters == "O") {
                // Sals àcides
                setResult([calcOxosals(processedFormula)])
            } else if (processedFormula[0].letters == "H" && processedFormula[2]?.letters == "O") {
                // Oxoacids
                setResult([calcOxoacids(processedFormula)])
            } else if (processedFormula[2].letters = "O" && processedFormula.length >= 4) {
                // Oxosals
                setResult([calcOxosals(processedFormula)])
            } else if ((processedFormula[0].isMetall === true && processedFormula[1].isMetall === false)) {
                // Sals binaries, no metall + metall
                setResult([calcNombreOxidacio(processedFormula, e.target[0].value)])
            } else if ((processedFormula[0].name === "hidrogen" && processedFormula[1].isMetall === false)) {
                // Hidrurs no metalics
                setResult([calcHidrursNoMetalics(processedFormula)])
            } else if (processedFormula[0].isMetall === false && processedFormula[1].isMetall === false) {
                // Combinacions de no metalls
                // setResult([`Prefixos: ${calcPrefixosMultiplicadors(processedFormula)}`, `Stock: ${calcNombreOxidacio(processedFormula)}`])
                setResult([calcPrefixosMultiplicadors(processedFormula)])
            }
            setMolarMass(calcMassaMolar(processedFormula))
        } else {
            // nameSplitter(e.target[0].value)
            let splitedName = e.target[0].value.toLowerCase().split(" ")

            if (splitedName[0] == "àcid") {
                let finalHtmlText = ""
                const currentValue = calcOxoacisFormula(splitedName)
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
    }

    const calcOxoacisFormula = (splitedName) => {
        let valence = 0
        let letter = ""
        let containsMeta = false

        console.log(splitedName[1].substring(0, 4))

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
                <FormulaInput labelRef={labelRef} />
                <input type="submit" value="Executar" />
            </StyledForm>
            {result.length === 0 ? (<TempResult />) : result.map((i, key) => (<div key={key}>Resultat:&nbsp;<span>{parse(i.charAt(0).toUpperCase() + i.slice(1))}</span></div>))}
            {
                molarMass !== 0 ?
                    <div>
                        Massa molar:&nbsp; <span>{molarMass}u</span>
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
