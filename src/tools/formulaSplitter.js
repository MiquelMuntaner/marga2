import { data } from "../data"

export const splitFormula = (s) => {
    if (s === "") { return {} }

    let buffer = ["", 1]
    let splitedFormula = []
    let currentParenthesis = false
    let parenthesisBufer = []

    for (let i in s) {
        if (s[i] === "(") {
            splitedFormula.push(buffer)
            buffer = ["empty"]
            currentParenthesis = true
        } else if (s[i] === ")") {
            currentParenthesis = false
            parenthesisBufer.push(buffer)
            splitedFormula.push(parenthesisBufer)
            buffer = ["empty"]
        } else if (s[i] === s[i].toUpperCase()) {
            if (currentParenthesis === true && buffer[0] !== "empty") {
                parenthesisBufer.push(buffer)
            } else if (buffer[0] !== "empty") {
                splitedFormula.push(buffer)
            }
            buffer = s[i]
        } else {
            buffer = buffer + s[i]
        }
    }

    splitedFormula.push(buffer)
    splitedFormula.shift()

    let finalFormula = []
    const hasNumber = /\d/;
    let parenthesisTempBuffer = []
    for (var i in splitedFormula) {
        if (Array.isArray(splitedFormula[i])) {
            for (var j in splitedFormula[i]) {
                if (hasNumber.test(splitedFormula[i][j])) {
                    parenthesisTempBuffer[parenthesisTempBuffer.length - 1] = [parenthesisTempBuffer[parenthesisTempBuffer.length - 1][0], parseInt(splitedFormula[i][j])]
                } else {
                    parenthesisTempBuffer.push([splitedFormula[i][j], 1])
                }
            }
            finalFormula.push(parenthesisTempBuffer)
        } else if (hasNumber.test(splitedFormula[i])) {
            if (Array.isArray(finalFormula[finalFormula.length - 1][0])) {
                finalFormula[finalFormula.length - 1] = [finalFormula[finalFormula.length - 1], parseInt(splitedFormula[i])]
            } else {
                finalFormula[finalFormula.length - 1] = [finalFormula[finalFormula.length - 1][0], parseInt(splitedFormula[i])]
            }
        } else {
            finalFormula.push([splitedFormula[i], 1])
        }
    }
    let processedFormula = addData(finalFormula)
    console.log(processedFormula)
    return processedFormula
}

const addData = (formula, numOfMolecules = 1) => {
    let elements = []
    let bufferDict = {}
    for (let i in formula) {
        if (!Array.isArray(formula[i][0])) {
            bufferDict = Object.assign({}, data[formula[i][0]])
            bufferDict["letters"] = formula[i][0]
            bufferDict["atomCount"] = formula[i][1] * numOfMolecules
            elements.push(bufferDict)
        } else {
            elements.push(addData(formula[i][0], formula[i][1]))
        }
    }
    elements.push({ "numOfMolecules": numOfMolecules })
    return elements
}