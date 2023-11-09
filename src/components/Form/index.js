import React from 'react'
import { data } from '../../data'

export const Form = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        let [splitedFormula, processedFormula] = splitFormula(e.target[0].value)
        if (processedFormula[0][2] === true && processedFormula[1][2] === false) {
            // calcOxids(finalFormula)
            console.log("oxid", processedFormula)
            calcNombreOxidacio(processedFormula)
        }
    }

    const calcNombreOxidacio = (formula) => {
        /*
        let valenciaNegativa = 0
        formula[1][1].forEach(num => {
            if (num < 0) { valenciaNegativa = num }
        })
        console.log(valenciaNegativa)
        */

        let valencia2nElement = 0
        for (let i in formula[1][1]) {
            console.log(i)
            if (formula[1][1][i] <= 0) { valencia2nElement = formula[1][1][i] }
        }
        console.log("valencia2", valencia2nElement)

        let valenciaMetall = formula[1][4] * -1 * valencia2nElement

        let valenciaSenseNegatiu = formula[0][1].map((x) => {
            if (x >= 0) { return x }
        })

        let compost = ""
        console.log(valenciaMetall)
        console.log(valenciaSenseNegatiu)

        compost = formula[1][3] + " de " + formula[0][0]
        if (valenciaSenseNegatiu.length !== 1) {
            console.log("aqui: ", compost)
            compost = `${compost}(${valenciaMetall})`
        }
        console.log(compost)
    }

    const splitFormula = (s) => {
        let buffer = ["", 1]
        let splitedFormula = []
        for (let i in s) {
            console.log(s[i])
            if (s[i] === s[i].toUpperCase()) {
                splitedFormula.push(buffer)
                buffer = s[i]
            } else {
                buffer = buffer + s[i]
            }
        }

        splitedFormula.push(buffer)
        splitedFormula.shift()

        let finalFormula = []
        const hasNumber = /\d/;
        for (var i in splitedFormula) {
            if (hasNumber.test(splitedFormula[i])) {
                finalFormula[finalFormula.length - 1] = [finalFormula[finalFormula.length - 1][0], parseInt(splitedFormula[i])]
            } else {
                finalFormula.push([splitedFormula[i], 1])
            }
        }
        let processedFormula = addData(finalFormula)
        return ([splitedFormula, processedFormula])
    }

    const addData = (formula) => {
        let elements = []
        for (let i in formula) {
            elements.push([].concat(data[formula[i][0]]).concat(formula[i][1]))
        }
        return elements
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" />
            <input type="submit" />
        </form>
    )
}
