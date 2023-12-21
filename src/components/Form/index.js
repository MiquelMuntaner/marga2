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

        console.log("som qui")
        if (e.target[0].value === "") {
            setResult([])
        } else if (e.target[0].value in exceptions) {
            // Excepcions
            setResult([exceptions[e.target[0].value]])
        } else if (e.target[0].value.includes("OH")) {
            // Hidroxids
            setResult([calcHidroxids(processedFormula)])
        } else if (processedFormula[0].letters == "H" && processedFormula[2]?.letters == "O") {
            // Oxoacids
            setResult([calcOxoacids(processedFormula)])
        } else if (processedFormula[2].letters = "O") {
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
            setResult([`Prefixos: ${calcPrefixosMultiplicadors(processedFormula)}`, `Stock: ${calcNombreOxidacio(processedFormula)}`])
        }
    }

    const calcOxoacids = (formula) => {
        let i = -(formula[0].atomCount + (formula[2].atomCount * -2))

        let iSenseNegatiu = formula[1].valences.map((x) => {
            if (x >= 0) { return x }
        }).filter((x) => {
            if (x !== undefined) { return x }
        })

        if (["B", "P", "As", "Sb", "Si"].includes(formula[1].letters)) {
            // Crea l'oxoacid i després mira si es el mateix,
            // en el cas que no sigui el mateix asumeix que s'hi han afegit tres aigues

            //Afegim oxigens
            let atomCountNewOxoacid = [0, 2, i]
            let atomCountInputOxoacid = [formula[0].atomCount, formula[1].atomCount, formula[2].atomCount]

            // Simplificam
            if (atomCountNewOxoacid[2] % 2 === 0) {
                atomCountNewOxoacid = [0, 1, i / 2]
            }

            // Afegim H2O
            atomCountNewOxoacid[0] = 2
            atomCountNewOxoacid[2] = atomCountNewOxoacid[2] + 1

            // Simplificam
            if (atomCountNewOxoacid[2] % 2 === 0) {
                atomCountNewOxoacid = [1, 1, (i + 1) / 2]
            }

            if (JSON.stringify(atomCountInputOxoacid) === JSON.stringify(atomCountNewOxoacid)) {
                return `àcid meta${formula[1].oxoAcidNames[iSenseNegatiu.indexOf(i) - 1]}`
            }
        }

        // Verificam si l'àcid está dimeritzat
        if (formula[1].atomCount == 2) {
            return `àcid di${formula[1].oxoAcidNames[iSenseNegatiu.indexOf(i / 2)]}`
        } else {
            return `àcid ${formula[1].oxoAcidNames[iSenseNegatiu.indexOf(i)]}`
        }
    }

    const calcOxosals = (formula) => {
        console.log(formula)
        let possibleAtomCountOxigen = []
        let possibleAtomCountHidrogen = []
        let possibleAtomCountHidrogenException = []
        let possibleAtomCountOxigenException = []
        let valenceMultiplier = 1
        let valenceDivider = formula[0].atomCount

        if (Object.prototype.toString.call(formula[1]) === '[object Array]') {
            valenceMultiplier = formula[1][2].numOfMolecules
            formula = [formula[0], formula[1][0], formula[1][1]]
            formula[1].atomCount = formula[1].atomCount / valenceMultiplier
            formula[2].atomCount = formula[2].atomCount / valenceMultiplier
        }

        let valenciesSenseNegatiu = formula[0].valences.map((x) => {
            if (x >= 0) { return x }
        }).filter((x) => {
            if (x !== undefined) { return x }
        })

        for (let i in formula[1].valences) {
            if (formula[1].valences[i] > 0) {
                //Afegim oxigens
                let atomCountNewOxoacid = [0, 2, formula[1].valences[i]]

                // Simplificam
                if (atomCountNewOxoacid[2] % 2 === 0) {
                    atomCountNewOxoacid = [0, 1, formula[1].valences[i] / 2]
                }

                // Afegim H2O
                atomCountNewOxoacid[0] = 2
                atomCountNewOxoacid[2] = atomCountNewOxoacid[2] + 1

                // Simplificam
                if (atomCountNewOxoacid[2] % 2 === 0 && atomCountNewOxoacid[1] % 2 === 0 && atomCountNewOxoacid[0] % 2 === 0 && atomCountNewOxoacid[2] !== 1) {
                    console.log("merda")
                    atomCountNewOxoacid = [1, 1, (formula[1].valences[i] + 1) / 2]
                }

                if (["B", "P", "As", "Sb", "Si"].includes(formula[1].letters)) {
                    let atomCountException = [0, 2, formula[1].valences[i]]

                    // Simplificam
                    if (atomCountException[2] % 2 === 0) {
                        atomCountException = [0, 1, formula[1].valences[i] / 2]
                    }

                    // Afegim 3(H2O)
                    atomCountException[0] = 6
                    atomCountException[2] = atomCountException[2] + 3

                    if (atomCountException[2] % 2 === 0 && atomCountException[1] % 2 === 0 && atomCountException[0] % 2 === 0 && atomCountException[2] !== 1) {
                        atomCountException = [atomCountException[0] / 2, 1, atomCountException[2] / 2]
                    }

                    possibleAtomCountHidrogenException.push(atomCountException[0])
                    possibleAtomCountOxigenException.push(atomCountException[2])
                }

                possibleAtomCountHidrogen.push(atomCountNewOxoacid[0])
                possibleAtomCountOxigen.push(atomCountNewOxoacid[2])

            }
        }

        if (["B", "P", "As", "Sb", "Si"].includes(formula[1].letters) && possibleAtomCountOxigen.includes(formula[2].atomCount) === false) {
            let hidrogenAtomCount = possibleAtomCountHidrogenException[possibleAtomCountHidrogenException.indexOf(formula[2].atomCount)] * valenceMultiplier / valenceDivider
            let oxoAcidName = formula[1].oxoAcidNames[possibleAtomCountOxigenException.indexOf(formula[2].atomCount)]

            if (oxoAcidName.substr((oxoAcidName.length - 4), (oxoAcidName.length - 2)).includes("ur")) {
                oxoAcidName = oxoAcidName.replace("urós", "it")
                oxoAcidName = oxoAcidName.replace("uric", "at")
                oxoAcidName = oxoAcidName.replace("òric", "at")
                oxoAcidName = oxoAcidName.replace("orós", "it")
            } else {
                oxoAcidName = oxoAcidName.replace("urós", "it")
                oxoAcidName = oxoAcidName.replace("uric", "at")
                oxoAcidName = oxoAcidName.replace("òric", "at")
                oxoAcidName = oxoAcidName.replace("orós", "it")
                oxoAcidName = oxoAcidName.replace("ós", "it").replace("ic", "at")
            }

            if (valenciesSenseNegatiu.length === 1) {
                return `${oxoAcidName} de ${formula[0].name}`
            } else {
                return `${oxoAcidName} de ${formula[0].name} (${intToRoman(hidrogenAtomCount.toString())})`
            }
        }

        let hidrogenAtomCount = possibleAtomCountHidrogen[possibleAtomCountOxigen.indexOf(formula[2].atomCount)] * valenceMultiplier / valenceDivider
        let oxoAcidName = formula[1].oxoAcidNames[possibleAtomCountOxigen.indexOf(formula[2].atomCount)]

        if (oxoAcidName.substr((oxoAcidName.length - 4), (oxoAcidName.length - 2)).includes("ur")) {
            console.log(oxoAcidName)
            oxoAcidName = oxoAcidName.replace("urós", "it")
            oxoAcidName = oxoAcidName.replace("uric", "at")
            oxoAcidName = oxoAcidName.replace("orós", "it")
            oxoAcidName = oxoAcidName.replace("òric", "at")
        } else {
            oxoAcidName = oxoAcidName.replace("urós", "it")
            oxoAcidName = oxoAcidName.replace("uric", "at")
            oxoAcidName = oxoAcidName.replace("òric", "at")
            oxoAcidName = oxoAcidName.replace("orós", "it")
            oxoAcidName = oxoAcidName.replace("ós", "it").replace("ic", "at")
        }

        if (valenciesSenseNegatiu.length === 1) {
            if (["B", "P", "As", "Sb", "Si"].includes(formula[1].letters)) {
                return `meta${oxoAcidName} de ${formula[0].name}`
            } else {
                return `${oxoAcidName} de ${formula[0].name}`
            }
        } else {
            if (["B", "P", "As", "Sb", "Si"].includes(formula[1].letters)) {
                return `meta${oxoAcidName} de ${formula[0].name} (${intToRoman(hidrogenAtomCount.toString())})`
            } else {
                return `${oxoAcidName} de ${formula[0].name} (${intToRoman(hidrogenAtomCount.toString())})`
            }
        }
    }

    const calcHidrursNoMetalics = (formula) => {
        return `${formula[1].plusUrName} d'hidrogen`
    }

    const calcHidroxids = (formula) => {
        let iSenseNegatiu = formula[0].valences.map((x) => {
            if (x >= 0) { return x }
        })

        if (iSenseNegatiu.length !== 1) {
            return `hidròxid de ${formula[0].name}(${intToRoman(formula[1][0].atomCount)})`
        } else {
            return `hidròxid de ${formula[0].name}`
        }
    }

    const calcPrefixosMultiplicadors = (formula) => {
        const prefixos = ["", "di", "tri", "tetra", "penta", "hexa", "hepta", "octa", "nona", "deca"]

        let iSenseNegatiu = formula[0].valences.map((x) => {
            if (x >= 0) { return x }
        })

        if ((formula[1].atomCount == 1) && (iSenseNegatiu.length > 1)) {
            return `mon${formula[1].plusUrName} de ${prefixos[formula[0].atomCount - 1]}${formula[0].name}`
        } else {
            return `${prefixos[formula[1].atomCount - 1]}${formula[1].plusUrName} de ${prefixos[formula[0].atomCount - 1]}${formula[0].name}`
        }
    }

    const calcNombreOxidacio = (formula) => {
        let i2nElement = 0
        formula[1].valences.forEach(num => {
            if (num < 0) { i2nElement = num }
        })

        let iMetall = (formula[1].atomCount * -1 * i2nElement) / formula[0].atomCount

        let iSenseNegatiu = formula[0].valences.map((x) => {
            if (x >= 0) { return x }
        })

        let compost = ""
        compost = formula[1].plusUrName + " de " + formula[0].name

        if (iSenseNegatiu.length !== 1) {
            console.log("aqui: ", compost)
            compost = `${compost}(${intToRoman(iMetall.toString())})`
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
