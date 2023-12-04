import React, { useEffect, useRef, useState } from 'react'
import { exceptions } from '../../data'
import { ContainerDiv, StyledForm, InputText, TopText, TextCursor } from './styles'
import { intToRoman } from '../../tools/intToRoman'
import { splitFormula } from '../../tools/formulaSplitter'

export const Form = () => {
    const [result, setResult] = useState("")
    const inputText = useRef()
    const [showTextCursor, setShowTextCursor] = useState(false)

    /*
    useEffect(() => {
        if (document.activeElement === inputText.current) {
            while (document.activeElement === inputText.current) {
                console.log("h")
            }
        }
    }, [inputText])
    */

    const onTextInputChange = (e) => {
        let finalHtmlText = ""
        const currentInputValue = e.target.value
        const hasNumber = /\d/;
        for (let i = 0; i < currentInputValue.length; i++) {
            if (hasNumber.test(currentInputValue[i])) {
                finalHtmlText = `${finalHtmlText}<sub>${currentInputValue[i]}</sub>`
            } else {
                finalHtmlText = `${finalHtmlText}${currentInputValue[i]}`
            }
        }
        document.getElementById("textFiller").innerHTML = `${finalHtmlText}`
    }

    const handleSubmit = (e) => {
        let processedFormula = splitFormula(e.target[0].value)

        e.preventDefault()
        if (e.target[0].value in exceptions) {
            setResult(exceptions[e.target[0].value])
        } else if (processedFormula[0].letters == "H" && processedFormula[2].letters == "O") {
            setResult(calcOxoacids(processedFormula))
        } else if (e.target[0].value.includes("OH")) {
            setResult(calcHidroxids(processedFormula))
        } else if ((processedFormula[0].isMetall === true && processedFormula[1].isMetall === false)) {
            setResult(calcNombreOxidacio(processedFormula, e.target[0].value))
        } else if ((processedFormula[0].name === "hidrogen" && processedFormula[1].isMetall === false)) {
            setResult(calcHidrursNoMetalics(processedFormula))
        } else if (processedFormula[0].isMetall === false && processedFormula[1].isMetall === false) {
            setResult(calcPrefixosMultiplicadors(processedFormula))
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
                <InputText name='formula' type="text" className='inputText' onChange={onTextInputChange} ref={inputText} />
                <TopText id="topText" className='topText'><div id="textFiller"></div><TextCursor /></TopText>
                <input type="submit" value="Executar" />
            </StyledForm>
            {result == "" ? null : <div>Resultat: <span>{result.charAt(0).toUpperCase() + result.slice(1)}</span></div>}
        </ContainerDiv>
    )
}
