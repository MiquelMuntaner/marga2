import React, { useRef, useState } from 'react'
import { exceptions } from '../../data'
import { ContainerDiv, StyledForm } from './styles'
import { intToRoman } from '../../tools/intToRoman'
import { splitFormula } from '../../tools/formulaSplitter'
import { FormulaInput } from '../FormulaInput'

export const Form = () => {
    const [result, setResult] = useState([])
    const inputText = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        let processedFormula = splitFormula(e.target[0].value)
        console.log(e.target[0].value)

        if (e.target[0].value === "") {
            setResult([])
        } else if (e.target[0].value in exceptions) {
            // Excepcions
            setResult([exceptions[e.target[0].value]])
        } else if (processedFormula[0].letters == "H" && processedFormula[2]?.letters == "O") {
            // Oxoacids
            setResult([calcOxoacids(processedFormula)])
        } else if (e.target[0].value.includes("OH")) {
            // Hidroxids
            setResult([calcHidroxids(processedFormula)])
        } else if ((processedFormula[0].isMetall === true && processedFormula[1].isMetall === false)) {
            // Sals binaries, no metall + metall
            setResult([calcNombreOxidacio(processedFormula, e.target[0].value)])
        } else if ((processedFormula[0].name === "hidrogen" && processedFormula[1].isMetall === false)) {
            // Hidrurs no metalics
            setResult([calcHidrursNoMetalics(processedFormula)])
        } else if (processedFormula[0].isMetall === false && processedFormula[1].isMetall === false) {
            // Combinacions de no metalls
            setResult([`Prefixos: ${calcPrefixosMultiplicadors(processedFormula)}`, `Stock: ${calcNombreOxidacio(processedFormula)}`])
        }
    }

    const calcOxoacids = (formula) => {
        let valencia = -(formula[0].atomCount + (formula[2].atomCount * -2))

        let valenciaSenseNegatiu = formula[1].valences.map((x) => {
            if (x >= 0) { return x }
        })

        return `àcid ${formula[1].oxoAcidNames[valenciaSenseNegatiu.indexOf(valencia) - 1]}`
    }

    const calcHidrursNoMetalics = (formula) => {
        return `${formula[1].plusUrName} d'hidrogen`
    }

    const calcHidroxids = (formula) => {
        let valenciaSenseNegatiu = formula[0].valences.map((x) => {
            if (x >= 0) { return x }
        })

        if (valenciaSenseNegatiu.length !== 1) {
            return `hidròxid de ${formula[0].name}(${intToRoman(formula[1][0].atomCount)})`
        } else {
            return `hidròxid de ${formula[0].name}`
        }
    }

    const calcPrefixosMultiplicadors = (formula) => {
        const prefixos = ["", "di", "tri", "tetra", "penta", "hexa", "hepta", "octa", "nona", "deca"]

        let valenciaSenseNegatiu = formula[0].valences.map((x) => {
            if (x >= 0) { return x }
        })

        if ((formula[1].atomCount == 1) && (valenciaSenseNegatiu.length > 1)) {
            return `mon${formula[1].plusUrName} de ${prefixos[formula[0].atomCount - 1]}${formula[0].name}`
        } else {
            return `${prefixos[formula[1].atomCount - 1]}${formula[1].plusUrName} de ${prefixos[formula[0].atomCount - 1]}${formula[0].name}`
        }
    }

    const calcNombreOxidacio = (formula) => {
        let valencia2nElement = 0
        formula[1].valences.forEach(num => {
            if (num < 0) { valencia2nElement = num }
        })

        let valenciaMetall = (formula[1].atomCount * -1 * valencia2nElement) / formula[0].atomCount

        let valenciaSenseNegatiu = formula[0].valences.map((x) => {
            if (x >= 0) { return x }
        })

        let compost = ""
        compost = formula[1].plusUrName + " de " + formula[0].name

        if (valenciaSenseNegatiu.length !== 1) {
            console.log("aqui: ", compost)
            compost = `${compost}(${intToRoman(valenciaMetall.toString())})`
        }
        return compost
    }

    return (
        <ContainerDiv>
            <StyledForm onSubmit={handleSubmit}>
                <label htmlFor="formula" className='form_label'>Formula</label>
                <FormulaInput inputText={inputText} />
                <input type="submit" value="Executar" />
            </StyledForm>
            {result == [] ? null : result.map((i, key) => (<div key={key}>Resultat: <span>{i.charAt(0).toUpperCase() + i.slice(1)}</span></div>))}
        </ContainerDiv>
    )
}
