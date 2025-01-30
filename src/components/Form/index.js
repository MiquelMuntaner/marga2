import React, { useRef, useState } from 'react'
import { exceptions } from '../../data'
import { Add, ContainerDiv, FlexContainer, InstructionsDiv, MoleculalMassDiv, QuestionMarkButton, StyledForm, TempResult } from './styles'
import parse from 'html-react-parser'
import { splitFormula } from '../../tools/formulaSplitter'
import { FormulaInput } from '../FormulaInput'
import { Header } from '../Header'
import { nameSplitter } from '../../tools/nameSplitter'
import { calcEntitatHomoatomica, calcHidroxids } from '../../tools/inorganicProcessor'
import { calcHidrursNoMetalics } from '../../tools/inorganicProcessor'
import { calcMassaMolar } from '../../tools/inorganicProcessor'
import { calcNombreOxidacio } from '../../tools/inorganicProcessor'
import { calcOxoacids } from '../../tools/inorganicProcessor'
import { calcOxosals } from '../../tools/inorganicProcessor'
import { calcPrefixosMultiplicadors } from '../../tools/inorganicProcessor'
import Swal from 'sweetalert2'


export const Form = () => {
    const [result, setResult] = useState([])
    const [molarMass, setMolarMass] = useState(0)
    const [doFormula, setDoFormula] = useState(true)
    const [formulaSplitted, setFormulaSplitted] = useState([])
    const [showMolecularMassDiv, setShowMolecularMassDiv] = useState(false)
    const [typeOfFormula, setTypeOfFormula] = useState("")
    const [instructions, setInstructions] = useState([])
    const inputText = useRef()
    const labelRef = useRef()
    console.log("instructions: ", instructions)
    const handleImgClick = (e) => {
        e.preventDefault()
        setDoFormula(!doFormula)
        setResult([])
        setShowMolecularMassDiv(false)
        setMolarMass(0)
        setTypeOfFormula("")
        setInstructions([])
        inputText.current.value = ""
    }

    const addInstructions = (newInstruction) => {
        setInstructions(instructions => [...instructions, newInstruction])
    }



    function inverse(obj){ 
        var retobj = {}; 
        for(var key in obj){ 
            retobj[obj[key]] = key; 
        } 
        return retobj; 
    } 

    const handleSubmit = (e) => {
        e.preventDefault()
        setShowMolecularMassDiv(false)

        setInstructions([])

        try {

            if (doFormula && e.target[0].value !== "") {
                setResult([])
                let returnValue = []
                returnValue = splitFormula(e.target[0].value)
                let processedFormula = returnValue[0]
                console.log(processedFormula)
                let tempElement = {}
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
                let resultValue = ""
    
                setFormulaSplitted(formulaWithoutParentheses)
                if (e.target[0].value === "") {
                    setResult([])
                } else if (e.target[0].value in exceptions) {
                    // Excepcions
                    resultValue = exceptions[e.target[0].value]
                    setResult([exceptions[e.target[0].value]])
                    addInstructions(`<b>${e.target[0].value}</b> es tracta d'una <b>excepció</b>, tot i que es podria formular de manera estàndard, habitualment es denomina simplement <b>"${exceptions[e.target[0].value]}"</b>`)
                    setTypeOfFormula("Excepció")
    
                } else if (formulaWithoutParentheses.length == 2) {
                    // Entitat homoatòmica
                    resultValue = calcEntitatHomoatomica(processedFormula, addInstructions)
                    setResult([resultValue])
                    setTypeOfFormula("Entitat homoatòmica, només conte un àtom")
    
                } else if (e.target[0].value.includes("OH")) {
                    // Hidroxids
                    resultValue = calcHidroxids(processedFormula, addInstructions)
                    setResult([resultValue])
                    setTypeOfFormula("Hidròxid (la nomenclatura preferent és la dels nombres d'oxidació)")
    
                } else if (formulaWithoutParentheses[1].letters == "H" && formulaWithoutParentheses[3]?.letters == "O") {
                    // Sals àcides
                    resultValue = calcOxosals(processedFormula, addInstructions)
                    setResult([resultValue])
                    setTypeOfFormula("Sal àcida")
    
                } else if (processedFormula[0].letters == "H" && processedFormula[2]?.letters == "O") {
                    // Oxoacids
                    resultValue = calcOxoacids(processedFormula, addInstructions)
                    setResult([resultValue])
                    setTypeOfFormula("Oxoàcid")
    
                } else if (formulaWithoutParentheses[2].letters == "O" && formulaWithoutParentheses.length >= 4) {
                    // Oxosals
                    resultValue = calcOxosals(processedFormula, addInstructions)
                    setResult([resultValue])
                    setTypeOfFormula("Oxisal")
    
                } else if ((processedFormula[0].isMetall === true && processedFormula[1].isMetall === false)) {
                    // Sals binaries, no metall + metall
                    resultValue = calcNombreOxidacio(processedFormula, addInstructions)
                    setResult([resultValue])
                    setTypeOfFormula("Sal binària (la nomenclatura preferent és la dels nombres d'oxidació)")
    
                } else if ((processedFormula[0].name === "hidrogen" && processedFormula[1].isMetall === false)) {
                    // Hidrurs no metalics
                    resultValue = calcHidrursNoMetalics(processedFormula, addInstructions)
                    setResult([resultValue])
                    setTypeOfFormula("Hidrur no-metàl·lic")
    
                } else if (processedFormula[0].isMetall === false && processedFormula[1].isMetall === false) {
                    // Combinacions de no metalls
                    // setResult([`Prefixos: ${calcPrefixosMultiplicadors(processedFormula)}`, `Stock: ${calcNombreOxidacio(processedFormula)}`])
                    resultValue = calcPrefixosMultiplicadors(processedFormula, addInstructions)
                    setResult([resultValue])
                    setTypeOfFormula("Combinació entre no-metalls (la nomenclatura preferent és la dels prefixos multiplicadors)")
                }
    
                if (returnValue[1] !== 0) {
                    addInstructions(`Observem que estem multiplicant per ${resultValue[1]} molècules d'aigua, per tant, el compost es troba <b>hidratat</b> i ho indiquem amb la nomenclatura corresponent: <b>${resultValue}―aigua (1/${returnValue[1]})</b>`)
                    setResult([`${resultValue}―aigua (1/${returnValue[1]})`])
                }
    
                let massaMolar = calcMassaMolar(formulaWithoutParentheses)
                if (massaMolar <= 99) { massaMolar = "0" + massaMolar }
    
                setMolarMass(massaMolar)
                console.log("result value", resultValue)
                if (resultValue == "undefined" || resultValue == "") {
                    Swal.fire({
                        title: 'Error',
                        text: 'El compost introduït no existeix o hi ha hagut un error',
                        icon: 'error',
                        confirmButtonText: 'Continua'
                      })
                    setResult([])
                    setMolarMass(0)
                    setTypeOfFormula("")
                    setInstructions([])
                }
            } else if (e.target[0].value !== "") {
    
                
                let finalHtmlText = ""
                let currentValue = ""
                let newExceptions = inverse(exceptions)
                
                if (e.target[0].value in newExceptions) {
                    currentValue = newExceptions[e.target[0].value]
                    setTypeOfFormula("Excepció")
                } else {
                    let splitedName = nameSplitter(e.target[0].value)
        
                    if (splitedName[splitedName.length - 1].isAcid == true) {
                        currentValue = calcOxoacisFormula(splitedName)
                        setTypeOfFormula("Oxoàcid")
                    } else if (splitedName[0].oxoSalNumber !== null || splitedName[splitedName.length - 1].isSalAcida == true) {
                        let output = calcOxoSalsFormula(splitedName)
                        currentValue = output[1]
                        if (output[0]) {
                            setTypeOfFormula("Sal àcida")                            
                        } else {
                            setTypeOfFormula("Oxisal")
                        }
        
                    } else if (splitedName[splitedName.length - 1].isHidroxid == true) {
                        currentValue = calcHidroxidsFormula(splitedName)
                        setTypeOfFormula("Hidròxid (la nomenclatura preferent és la dels nombres d'oxidació)")
        
                    } else if (splitedName[0].isMetall === false && splitedName[1].isMetall === true) {
                        currentValue = calcNombreOxidacioFormula(splitedName)
                        setTypeOfFormula("Sal binària (la nomenclatura preferent és la dels nombres d'oxidació)")
        
                    } else if (splitedName[0].isMetall === false && splitedName[1].isMetall === false) {
                        currentValue = calcPrefixesMultiplicadorsFormula(splitedName)
                        setTypeOfFormula("Combinació entre no-metalls (la nomenclatura preferent és la dels prefixos multiplicadors)")
        
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
    
                let processedFormula = splitFormula(currentValue)
                console.log("processed formula", processedFormula)
                let formulaWithoutParentheses = []
                let tempElement = {}
                for (let i in processedFormula[0]) {
                    if (Array.isArray(processedFormula[0][i])) {
                        for (let k in processedFormula[0][i]) {
                            if (k !== processedFormula[0][i].length - 1) {
                                // No estic segur de perquè aixó funciona, pero multiplica es nombre de molecules per es nombre d'atoms
                                tempElement = { ...processedFormula[0][i][k] }
                                formulaWithoutParentheses.push(tempElement)
                            }
                        }
                    } else {
                        formulaWithoutParentheses.push(processedFormula[0][i])
                    }
                }
                console.log("sense parentesis", formulaWithoutParentheses)
                setFormulaSplitted(formulaWithoutParentheses)
    
                let massaMolar = calcMassaMolar(formulaWithoutParentheses)
                if (massaMolar <= 99) { massaMolar = "0" + massaMolar }
    
                setMolarMass(massaMolar)

            }

            console.log("Result: ", result)
            if (result[0] == "undefined" || result[0] == "") {
                Swal.fire({
                    title: 'Error',
                    text: 'El compost introduït no existeix o hi ha hagut un error',
                    icon: 'error',
                    confirmButtonText: 'Continua'
                  })
                  setResult([])
                  setMolarMass(0)
                  setTypeOfFormula("")
                  setInstructions([])
            }
        } catch (exceptionVar) {
            console.warn(exceptionVar)
            Swal.fire({
                title: 'Error',
                text: 'El compost introduït no existeix o hi ha hagut un error',
                icon: 'error',
                confirmButtonText: 'Continua'
              })
        }

    }

    const calcOxoSalsFormula = (splitedName) => {
        let numberOfHidrogens = 0
        let letter = splitedName[0].chemicalSymbol

        // Aconseguim les valencies sense comptar les negatives per a determinar la valencia
        const valencesWithoutNegatives = splitedName[0].valences.map((x) => {
            if (x >= 0) { return x }
        }).filter((x) => {
            if (x !== undefined) { return x }
        })
        const valence = valencesWithoutNegatives[splitedName[0].oxoSalNumber]

        let newOxoacid = [0, 2, valence]

        // Simplificam
        if (newOxoacid[2] % 2 === 0) {
            newOxoacid = [0, 1, valence / 2]
        }

        // Excepcions
        if (["B", "P", "As", "Sb"].includes(letter) && splitedName[splitedName.length - 1].isAcidException != true) {
            newOxoacid[0] = 6
            newOxoacid[2] = newOxoacid[2] + 3
        } else if (letter == "Si" && splitedName[splitedName.length - 1].isAcidException != true) {
            newOxoacid[0] = 4
            newOxoacid[2] = newOxoacid[2] + 2
        } else {
            // Afegim H2O
            newOxoacid[0] = 2
            newOxoacid[2] += 1
        }

        // Simplificam
        if (newOxoacid[2] % 2 === 0 && newOxoacid[1] % 2 === 0 && newOxoacid[0] % 2 === 0) {
            newOxoacid = [newOxoacid[0] / 2, newOxoacid[1] / 2, newOxoacid[2] / 2]
        }

        // Acids dimeritzats
        if (splitedName[0].atomCount == 2 && splitedName[splitedName.length - 1].isSalAcida == false) {
            newOxoacid = [newOxoacid[0] * 2, newOxoacid[1] * 2, newOxoacid[2] * 2]
            newOxoacid = [newOxoacid[0] - 2, newOxoacid[1], newOxoacid[2] - 1]

            // Simplificam
            if (newOxoacid[2] % 2 === 0 && newOxoacid[1] % 2 === 0 && newOxoacid[0] % 2 === 0) {
                newOxoacid = [newOxoacid[0] / 2, newOxoacid[1] / 2, newOxoacid[2] / 2]
            }
        }

        // Definim la valencia de l'element pel qual sustituirem els oxigens
        const valencesWithoutNegatives2 = splitedName[1].valences.map((x) => {
            if (x >= 0) { return x }
        }).filter((x) => {
            if (x !== undefined) { return x }
        })
        let valence2 = (splitedName[splitedName.length - 1].romanNumbers !== null ? splitedName[splitedName.length - 1].romanNumbers : valencesWithoutNegatives2[0])

        if (splitedName[splitedName.length - 1].isSalAcida == true) {
            numberOfHidrogens = (splitedName[0].atomCount !== null ? splitedName[0].atomCount : 1)
            newOxoacid[0] = (splitedName[0].atomCount !== null ? newOxoacid[0] - splitedName[0].atomCount : newOxoacid[0] - 1)
        }

        let numberOfAtomsOfTheFirstElement = newOxoacid[0] * valence2 / valence2
        let numberOfAtomsOfTheSecondElement = newOxoacid[0] * valence2 / newOxoacid[0]

        if (numberOfAtomsOfTheFirstElement % 2 == 0 && numberOfAtomsOfTheSecondElement % 2 == 0) {
            numberOfAtomsOfTheFirstElement = numberOfAtomsOfTheFirstElement / 2
            numberOfAtomsOfTheSecondElement = numberOfAtomsOfTheSecondElement / 2
        }

        return [numberOfHidrogens != 0 ? true : false, splitedName[1].chemicalSymbol
            + (numberOfAtomsOfTheFirstElement !== 1 ? numberOfAtomsOfTheFirstElement : "")
            + (numberOfAtomsOfTheSecondElement !== 1 ? "(" : "")
            + (numberOfHidrogens !== 0 ? "H" : "")
            + (numberOfHidrogens > 1 ? numberOfHidrogens : "")
            + letter
            + (newOxoacid[1] !== 1 ? newOxoacid[1] : "")
            + "O"
            + (newOxoacid[2] !== 1 ? newOxoacid[2] : "")
            + (numberOfAtomsOfTheSecondElement !== 1 ? ")" : "")
            + (numberOfAtomsOfTheSecondElement !== 1 ? numberOfAtomsOfTheSecondElement : "")]
    }

    const calcHidroxidsFormula = (splitedName) => {
        const valencesWithoutNegatives = splitedName[0].valences.map((x) => {
            if (x >= 0) { return x }
        }).filter((x) => {
            if (x !== undefined) { return x }
        })

        let valence = (valencesWithoutNegatives.length === 1 ? valencesWithoutNegatives[0] : splitedName[splitedName.length - 1].romanNumbers)

        return splitedName[0].chemicalSymbol
            + (valence > 1 ? "(OH)" : "OH")
            + (valence > 1 ? valence : "")
    }

    const calcPrefixesMultiplicadorsFormula = (splitedName) => {

        return splitedName[1].chemicalSymbol
            + (splitedName[1].atomCount !== 1 && splitedName[1].atomCount !== null ? splitedName[1].atomCount : "")
            + splitedName[0].chemicalSymbol
            + (splitedName[0].atomCount !== 1 && splitedName[0].atomCount !== null ? splitedName[0].atomCount : "")
    }

    const calcNombreOxidacioFormula = (splitedName) => {
        const valencesWithoutNegatives = splitedName[1].valences.map((x) => {
            if (x >= 0) { return x }
        }).filter((x) => {
            if (x !== undefined) { return x }
        })

        let valence = (splitedName.slice(-1)[0].romanNumbers !== null ? splitedName.slice(-1)[0].romanNumbers : valencesWithoutNegatives[0])

        // Asignam les valencies
        let atomCount = [Math.abs(splitedName[0].valences[0]), valence]

        // Simplificam
        if (atomCount[0] % 2 === 0 && atomCount[1] % 2 === 0) {
            atomCount = [atomCount[0] / 2, atomCount[1] / 2]
        }

        return splitedName[1].chemicalSymbol
            + (atomCount[0] !== 1 ? atomCount[0] : "")
            + splitedName[0].chemicalSymbol
            + (atomCount[1] !== 1 ? atomCount[1] : "")
    }

    const calcOxoacisFormula = (splitedName) => {
        let letter = splitedName[0].chemicalSymbol

        // Aconseguim les valencies sense comptar les negatives per a determinar la valencia
        const valencesWithoutNegatives = splitedName[0].valences.map((x) => {
            if (x >= 0) { return x }
        }).filter((x) => {
            if (x !== undefined) { return x }
        })
        const valence = valencesWithoutNegatives[splitedName[0].oxoAcidNumber]

        let newOxoacid = [0, 2, valence]

        // Simplificam
        if (newOxoacid[2] % 2 === 0) {
            newOxoacid = [0, 1, valence / 2]
        }

        // Excepcions
        if (["B", "P", "As", "Sb"].includes(letter) && splitedName[splitedName.length - 1].isAcidException) {
            newOxoacid[0] = 6
            newOxoacid[2] = newOxoacid[2] + 3
        } else if (letter == "Si" && splitedName[splitedName.length - 1].isAcidException === false) {
            newOxoacid[0] = 4
            newOxoacid[2] = newOxoacid[2] + 2
        } else {
            // Afegim H2O
            newOxoacid[0] = 2
            newOxoacid[2] += 1
        }

        // Simplificam
        if (newOxoacid[2] % 2 === 0 && newOxoacid[1] % 2 === 0 && newOxoacid[0] % 2 === 0) {
            newOxoacid = [newOxoacid[0] / 2, newOxoacid[1] / 2, newOxoacid[2] / 2]
        }

        // Acids dimeritzats
        if (splitedName[0].atomCount == 2) {
            newOxoacid = [newOxoacid[0] * 2, newOxoacid[1] * 2, newOxoacid[2] * 2]
            newOxoacid = [newOxoacid[0] - 2, newOxoacid[1], newOxoacid[2] - 1]

            // Simplificam
            if (newOxoacid[2] % 2 === 0 && newOxoacid[1] % 2 === 0 && newOxoacid[0] % 2 === 0) {
                newOxoacid = [newOxoacid[0] / 2, newOxoacid[1] / 2, newOxoacid[2] / 2]
            }
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
        <FlexContainer>
            <ContainerDiv>
                <Header subheader="Inorgànica" />
                <StyledForm id="form" onSubmit={handleSubmit} autocomplete="off" >
                    <label htmlFor="formula" className='form_label' id='inorganica_label' ref={labelRef}>{doFormula ? "Fórmula" : "Nom"}</label>
                    <img src="./assets/icono-rotar.png" alt="" onClick={handleImgClick} />
                    <FormulaInput labelRef={labelRef} doFormula={doFormula} inputText={inputText} />
                    <input type="submit" value="Executar"></input>
                </StyledForm>
                {result.length === 0 ? (<TempResult />) : result.map((i, key) => (<div key={key}>Resultat:&nbsp;<span>{parse(i.charAt(0).toUpperCase() + i.slice(1))}</span></div>))}
                {typeOfFormula !== "" ? <div>Tipus:&nbsp;<span>{typeOfFormula}</span></div> : ""}
                {
                    molarMass !== 0 ?
                        <div>
                            Massa molar:&nbsp; <span>{molarMass.toString().replace(".", ",")}</span>&nbsp;g/mol
                            <QuestionMarkButton onClick={handleQuestionMarkButtonClick}>?</QuestionMarkButton>
                            {showMolecularMassDiv ?
                                <MoleculalMassDiv>
                                    <div>
                                        <div />
                                    </div>
                                    <div>
                                        {formulaSplitted.map((i) => (
                                            (i.molarMass !== undefined && i.letters !== "" ? <div><p>{i.letters}:</p><p>{i.molarMass}</p></div> : "")
                                        ))}
                                    </div>
                                </MoleculalMassDiv> : ""
                            }
                        </div>
                        : ""
                }
            </ContainerDiv>
            <InstructionsDiv>
                <ol>
                    <p>Procediment</p>
                    {instructions.length == 0 ? <span>El procediment no es troba disponible</span> : <>
                        {instructions.map(function (content, i) {
                            return <li key={i} dangerouslySetInnerHTML={{ __html: content }}></li>
                        })}
                    </>}
                </ol>
            </InstructionsDiv>
        </FlexContainer>
    )
}
