import { intToRoman } from "./intToRoman";
import { round } from "./round";

export const calcMassaMolar = (formula) => {
    let finalMolarMass = 0

    for (let i in formula) {
        finalMolarMass = finalMolarMass
            + (formula[i].molarMass !== undefined ? formula[i].molarMass * formula[i].atomCount : 0)
    }

    return round(finalMolarMass, 4)
}

const primerLletraMajuscula = (val) => (
    String(val).charAt(0).toUpperCase() + String(val).slice(1)
)

export const calcEntitatHomoatomica = (formula, addInstructions) => {
    const prefixos = ["", "di", "tri", "tetra", "penta", "hexa", "hepta", "octa", "nona", "deca"]
    let result = prefixos[formula[0].atomCount - 1]
        + formula[0].name

    addInstructions(`<b>${formula[0].letters}<sub>${formula[0].atomCount}</sub></b> és una molècula composta per un únic tipus d'àtom, per la qual cosa és considera una <b>entitat homoàtomica</b>.`)
    addInstructions(`En aquest cas afegim el <b>prefix multiplicador</b> per indicar el nombre d'àtoms presents. Per tant obtenim de resultat: <b>${result}</b>`)
    return result
}

export const calcOxoacids = (formula, addInstructions) => {
    console.log(formula, "oxosal")
    let valenceMiddleElement = -(formula[0].atomCount + (formula[2].atomCount * -2))
    addInstructions(`Si la fórmula té l'estructura <b>H<sub>a</sub>X<sub>b</sub>O<sub>c</sub></b>, <b>és un oxoàcid</b>. Sabent que l'oxigen té valència -2 i l'hidrogen +1, calculem el nombre d'oxidació de l'element central (X) perquè <b>la càrrega total sigui 0</b>, resultant en <b>${formula[1].atomCount == 2 ? valenceMiddleElement/2 : valenceMiddleElement}</b>.`)

    let valencesWithoutNegatives = formula[1].valences.map((x) => {
        if (x >= 0) { return x }
    }).filter((x) => {
        if (x !== undefined) { return x }
    })

    if (formula[1].name == "manganès") {
        if (valencesWithoutNegatives.indexOf(2) > -1) {
            valencesWithoutNegatives.splice(valencesWithoutNegatives.indexOf(2), 1)
        }
    }

    addInstructions(`Un cop determinat el nombre d'oxidació de l'element central, segons <a target=”_blank” href="./assets/Taula-oxids-no-metàl·lics.png">la taula</a> obtenim el compost formulat. Aquest, com que es tracta d'un oxoàcid, <b>comença amb "Àcid"</b>, seguit del nom específic segons el nombre d'oxidació (en aquest cas: <b>${formula[1].atomCount == 2 ? formula[1].oxoAcidNames[valencesWithoutNegatives.indexOf(valenceMiddleElement / 2)] : formula[1].oxoAcidNames[valencesWithoutNegatives.indexOf(valenceMiddleElement)]}</b>).`)
    
    // Excepcions dels oxoàcids
    if (["B", "P", "As", "Sb", "Si"].includes(formula[1].letters)) {
        // Crea l'oxoacid i després mira si es el mateix,
        // en el cas que no sigui el mateix asumeix que s'hi han afegit tres aigues

        addInstructions(`Com que es tracta del ${formula[1].name}, cal considerar que <b>és una excepció</b>, ja que els seus oxoàcids <b>poden formar-se afegint una o ${["B", "Si"].includes(formula[1].letters) ? "dues" : "tres"}</b> molècules d'aigua. Per tant, comprovem si és possible formar l'àcid que se'ns presenta afegint només una molècula d'aigua.`)

        //Afegim oxigens
        let atomCountNewOxoacid = [0, 2, valenceMiddleElement]
        let atomCountInputOxoacid = [formula[0].atomCount, formula[1].atomCount, formula[2].atomCount]

        // Simplificam
        if (atomCountNewOxoacid[2] % 2 === 0) {
            atomCountNewOxoacid = [0, 1, valenceMiddleElement / 2]
        }

        // Afegim H2O
        atomCountNewOxoacid[0] = 2
        atomCountNewOxoacid[2] = atomCountNewOxoacid[2] + 1

        // Simplificam
        if (atomCountNewOxoacid[2] % 2 === 0) {
            atomCountNewOxoacid = [1, 1, (valenceMiddleElement + 1) / 2]
        }

        if (JSON.stringify(atomCountInputOxoacid) === JSON.stringify(atomCountNewOxoacid)) {
            addInstructions(`Com que no és el cas <b>hem d'afegir el prefix "meta"</b> a l'inici, indicant que és l'excepció.`)
            return `àcid meta${formula[1].oxoAcidNames[valencesWithoutNegatives.indexOf(valenceMiddleElement)]}`
        }
        addInstructions(`Com que és el cas podem <b>no afegir cap prefix o afegir el prefix "orto"</b>, indicant que només se li ha afegit una molècula d'aigua.`)
    }

    if (formula[1].atomCount == 2) {
        addInstructions(`En aquest cas veiem que hi ha dos àtoms de ${formula[1].name}, per tant, <b>l'àcid està dimeritzat</b>. Per indicar-ho afegim el <b>prefix "di"</b>.`)
    }

    // Verificam si l'àcid está dimeritzat i tornam el resultat
    return "àcid " +
        (formula[1].atomCount == 2 ?
            `di${formula[1].oxoAcidNames[valencesWithoutNegatives.indexOf(valenceMiddleElement / 2)]}` :
            `${formula[1].oxoAcidNames[valencesWithoutNegatives.indexOf(valenceMiddleElement)]}`)
}

export const calcOxosals = (formula, addInstructions) => {
    let possibleAtomCountOxigen = []
    let possibleAtomCountHidrogen = []
    let possibleAtomCountHidrogenException = []
    let possibleAtomCountOxigenException = []
    let valenceMultiplier = 1
    let valenceDivider = formula[0].atomCount
    const prefixos = ["", "di", "tri", "tetra", "penta", "hexa", "hepta", "octa", "nona", "deca"]

    console.log("aquiii")
    // Verificam si hi ha més d'una molècula de l'anió oxoàcid,
    // en aquell cas revertim el procés que es du a terme en la funció de dividir la fórmula
    if (Object.prototype.toString.call(formula[1]) === '[object Array]') {
        if (formula[1].length === 4) {
            valenceMultiplier = formula[1][3].numOfMolecules
            formula = [formula[0], formula[1][0], formula[1][1], formula[1][2], formula[2]]
            formula[3].atomCount = formula[3].atomCount
        } else {
            valenceMultiplier = formula[1][2].numOfMolecules
            formula = [formula[0], formula[1][0], formula[1][1]]
        }
        formula[1].atomCount = formula[1].atomCount
        formula[2].atomCount = formula[2].atomCount
    }
    console.log("lengths", formula)

    let valenciesSenseNegatiu = formula[0].valences.map((x) => {
        if (x >= 0) { return x }
    }).filter((x) => {
        if (x !== undefined) { return x }
    })

    let usedValences = (formula.length === 5 ? formula[2].valences : formula[1].valences)


    for (let i in usedValences) {
        if (usedValences[i] > 0) {
            //Afegim oxigens i tenim en compte sals

            let atomCountNewOxoacid = [0, 2, usedValences[i]]

            // Simplificam
            if (atomCountNewOxoacid[2] % 2 === 0) {
                atomCountNewOxoacid = [0, 1, usedValences[i] / 2]
            }

            // Afegim H2O
            atomCountNewOxoacid[0] = 2
            atomCountNewOxoacid[2] = atomCountNewOxoacid[2] + 1

            // Simplificam
            if (atomCountNewOxoacid[2] % 2 === 0 && atomCountNewOxoacid[1] % 2 === 0 && atomCountNewOxoacid[0] % 2 === 0 && atomCountNewOxoacid[2] !== 1) {
                atomCountNewOxoacid = [1, 1, (usedValences[i] + 1) / 2]
            }

            if (["B", "P", "As", "Sb", "Si"].includes((formula.length === 5 ? formula[2].letters : formula[1].letters))) {
                let atomCountException = [0, 2, usedValences[i]]

                // Simplificam
                if (atomCountException[2] % 2 === 0) {
                    atomCountException = [0, 1, usedValences[i] / 2]
                }

                // Afegim 3(H2O)
                if (formula[1].letters == "Si") {
                    atomCountException[0] = 4
                    atomCountException[2] = atomCountException[2] + 2
                } else {
                    atomCountException[0] = 6
                    atomCountException[2] = atomCountException[2] + 3
                }

                if (atomCountException[2] % 2 === 0 && atomCountException[1] % 2 === 0 && atomCountException[0] % 2 === 0 && atomCountException[2] !== 1) {
                    atomCountException = [atomCountException[0] / 2, 1, atomCountException[2] / 2]
                }

                possibleAtomCountHidrogenException.push(atomCountException[0])
                possibleAtomCountOxigenException.push(atomCountException[2])
                console.log("oxigen", possibleAtomCountOxigenException)
            }

            possibleAtomCountHidrogen.push(atomCountNewOxoacid[0])
            possibleAtomCountOxigen.push(atomCountNewOxoacid[2])

        }
    }

    let hidrogenAtomCount = 0
    let oxoAcidName = ""

    // Canviant formula per tenir en compte sals àcides
    let usedFormula = (formula.length === 5 ? [formula[0], formula[2], formula[3]] : formula)

    if (["B", "P", "As", "Sb", "Si"].includes(usedFormula[1].letters) && possibleAtomCountOxigen.includes(usedFormula[2].atomCount) === false) {
        // Acids dimeritzats
        if (usedFormula[1].atomCount === 2) {
            hidrogenAtomCount = possibleAtomCountHidrogenException[possibleAtomCountOxigenException.indexOf((usedFormula[2].atomCount + 1) / 2)] * valenceMultiplier / valenceDivider
            oxoAcidName = usedFormula[1].oxoAcidNames[possibleAtomCountOxigenException.indexOf((usedFormula[2].atomCount + 1) / 2)]
        } else {
            hidrogenAtomCount = possibleAtomCountHidrogenException[possibleAtomCountOxigenException.indexOf(usedFormula[2].atomCount)] * valenceMultiplier / valenceDivider
            oxoAcidName = usedFormula[1].oxoAcidNames[possibleAtomCountOxigenException.indexOf(usedFormula[2].atomCount)]
            console.log("aquiiii alots")
        }

        hidrogenAtomCount = (formula.length === 5 ? hidrogenAtomCount -  formula[1].atomCount : hidrogenAtomCount)

        console.log("HOOOLAAA", usedFormula[2])
        console.log("dos", possibleAtomCountOxigenException.indexOf(usedFormula[2].atomCount))
        oxoAcidName = oxoAcidName.replace("urós", "it")
        oxoAcidName = oxoAcidName.replace("uric", "at")
        oxoAcidName = oxoAcidName.replace("úros", "it")
        oxoAcidName = oxoAcidName.replace("úric", "at")
        oxoAcidName = oxoAcidName.replace("òric", "at")
        oxoAcidName = oxoAcidName.replace("orós", "it")

        if (["ós", "ic"].includes(oxoAcidName.slice(-2))) {
            oxoAcidName = oxoAcidName.replace("ós", "it").replace("ic", "at")
        }

        let oxoAcidOriginal = `H<sub>${formula.length !== 5 ? (hidrogenAtomCount != 1 ? hidrogenAtomCount : ""): (hidrogenAtomCount != 1 ? hidrogenAtomCount : "")}</sub>${formula.length !== 5 ? formula[1].letters : formula[2].letters}<sub>${formula.length !== 5 ? (formula[1].atomCount != 1 ? formula[1].atomCount : "") : (formula[2].atomCount != 1 ? formula[2].atomCount : "")}</sub>O<sub>${formula.length === 5 ? (formula[3].atomCount != 1 ? formula[3].atomCount : "") : (formula[2].atomCount != 1 ? formula[2].atomCount : "")}</sub>`
        addInstructions(`A diferència dels oxoàcids, les oxosals tenen un altre element ocupant el lloc dels hidrògens. ${formula.length !== 5 ? "Per tant, identifiquem que <b>es tracta d'una oxosal</b>" : "A més en aquest cas no ha perdut tots els hidrogens l'oxoàcid, per tant, <b>es tracta d'una sal àcida</b>."}. El primer pas és determinar de quin oxoàcid deriva; en aquest cas, <b>l'origen és ${oxoAcidOriginal}</b>.`)

        addInstructions(`A partir de l'oxoàcid ${oxoAcidOriginal}, <b>determinem la valència del ${formula[1].name}</b> i consultem <a target=”_blank” href="./assets/Taula-oxosals.png">la taula per a les oxosals</a> per identificar com s'ha de nomenar el ${formula[1].name} en l'oxosal (<b>en aquest cas "${oxoAcidName}"</b>).`)

        if (valenciesSenseNegatiu.length === 1) {
            addInstructions(`Determinem l'estat d'oxidació del metall (${formula[0].name}), que en aquest cas és <b>${hidrogenAtomCount}</b>. Com que només té un estat d'oxidació possible, <b>no cal indicar-lo</b>. Per tant tenim: <b>"${primerLletraMajuscula(oxoAcidName)} de ${usedFormula[0].name}"</b>.`)
        } else {
            addInstructions(`Determinem l'estat d'oxidació del metall (${formula[0].name}), que en aquest cas és <b>${hidrogenAtomCount}</b>. Com que té més d'un estat d'oxidació possible, <b>l'indiquem entre parèntesis</b> amb nombres romans. Per tant tenim: <b>"${primerLletraMajuscula(oxoAcidName)} de ${usedFormula[0].name}(${intToRoman(hidrogenAtomCount.toString())})"</b>`)
        }

        if (formula.length === 5) {
            addInstructions(`Com que no s'han perdut tots els hidrògens, <b>afegim el prefix "Hidrogen"</b> per indicar que es tracta d'una sal àcida.`)
            if (usedFormula[1].atomCount === 2) {
                addInstructions(`A més, com que queden dos hidrògens, <b>afegim també el prefix "di"</b>.`)
            }
        }

        addInstructions(`Cal destacar que com que el ${formula.length === 5 ? formula[2].name : formula[1].name} <b>es tracta d'una excepció</b> hem de revisar si es pot formar l'oxoàcid del qual prové emprant només una molècula d'aigua. Com que si és el cas <b>no és necessari afegir cap prefix</b>.`)

        return (formula.length === 5 ? `${prefixos[formula[1].atomCount - 1]}hidrogen` : "")
            + `${oxoAcidName} de ${usedFormula[0].name}`
            + (valenciesSenseNegatiu.length === 1 ? "" : `(${intToRoman(hidrogenAtomCount.toString())})`)

    }

    // Acids dimeritzats
    if (usedFormula[1].atomCount === 2) {
        hidrogenAtomCount = possibleAtomCountHidrogen[possibleAtomCountOxigen.indexOf((usedFormula[2].atomCount + 1) / 2)] * valenceMultiplier / valenceDivider
        oxoAcidName = usedFormula[1].oxoAcidNames[possibleAtomCountOxigen.indexOf((usedFormula[2].atomCount + 1) / 2)]
    } else {
        hidrogenAtomCount = possibleAtomCountHidrogen[possibleAtomCountOxigen.indexOf(usedFormula[2].atomCount)] * valenceMultiplier / valenceDivider
        oxoAcidName = usedFormula[1].oxoAcidNames[possibleAtomCountOxigen.indexOf(usedFormula[2].atomCount)]
    }

    hidrogenAtomCount = (formula.length === 5 ? hidrogenAtomCount - formula[1].atomCount : hidrogenAtomCount)
    console.log("hidrogenatomcount", hidrogenAtomCount)

    let oxoAcidOriginal = `H<sub>${formula.length !== 5 ? (hidrogenAtomCount != 1 ? hidrogenAtomCount : ""): (hidrogenAtomCount+formula[1].atomCount != 1 ? hidrogenAtomCount+formula[1].atomCount : "")}</sub>${formula.length !== 5 ? formula[1].letters : formula[2].letters}<sub>${formula.length !== 5 ? (formula[1].atomCount != 1 ? formula[1].atomCount : "") : (formula[2].atomCount != 1 ? formula[2].atomCount : "")}</sub>O<sub>${formula.length === 5 ? (formula[3].atomCount != 1 ? formula[3].atomCount : "") : (formula[2].atomCount != 1 ? formula[2].atomCount : "")}</sub>`
    addInstructions(`A diferència dels oxoàcids, les oxosals tenen un altre element ocupant el lloc dels hidrògens. ${formula.length !== 5 ? "Per tant, identifiquem que <b>es tracta d'una oxosal</b>" : "A més en aquest cas no ha perdut tots els hidrogens l'oxoàcid, per tant, <b>es tracta d'una sal àcida</b>."}. El primer pas és determinar de quin oxoàcid deriva; en aquest cas, <b>l'origen és ${oxoAcidOriginal}</b>.`)

    oxoAcidName = oxoAcidName.replace("urós", "it")
    oxoAcidName = oxoAcidName.replace("uric", "at")
    oxoAcidName = oxoAcidName.replace("úros", "it")
    oxoAcidName = oxoAcidName.replace("úric", "at")
    oxoAcidName = oxoAcidName.replace("òric", "at")
    oxoAcidName = oxoAcidName.replace("orós", "it")

    if (["ós", "ic"].includes(oxoAcidName.slice(-2))) {
        oxoAcidName = `${oxoAcidName.slice(0, -2)}${oxoAcidName.slice(-2).replace("ós", "it").replace("ic", "at")}`
    }

    if ("oxoSalNames" in usedFormula[1]) {
        oxoAcidName = usedFormula[1].oxoSalNames[possibleAtomCountOxigen.indexOf(usedFormula[2].atomCount)]
    }

    addInstructions(`A partir de l'oxoàcid ${oxoAcidOriginal}, <b>determinem la valència del ${formula[1].name}</b> i consultem <a target=”_blank” href="./assets/Taula-oxosals.png">la taula per a les oxosals</a> per identificar com s'ha de nomenar el ${formula[1].name} en l'oxosal (<b>en aquest cas "${oxoAcidName}"</b>).`)

    if (valenciesSenseNegatiu.length === 1) {
        addInstructions(`Determinem l'estat d'oxidació del metall (${formula[0].name}), que en aquest cas és <b>${hidrogenAtomCount}</b>. Com que només té un estat d'oxidació possible, <b>no cal indicar-lo</b>. Per tant tenim: <b>"${primerLletraMajuscula(oxoAcidName)} de ${usedFormula[0].name}"</b>.`)
    } else {
        addInstructions(`Determinem l'estat d'oxidació del metall (${formula[0].name}), que en aquest cas és <b>${hidrogenAtomCount}</b>. Com que té més d'un estat d'oxidació possible, <b>l'indiquem entre parèntesis</b> amb nombres romans. Per tant tenim: <b>"${primerLletraMajuscula(oxoAcidName)} de ${usedFormula[0].name}(${intToRoman(hidrogenAtomCount.toString())})"</b>`)
    }

    if (formula.length === 5) {
        addInstructions(`Com que no s'han perdut tots els hidrògens, <b>afegim el prefix "Hidrogen"</b> per indicar que es tracta d'una sal àcida.`)
        if (usedFormula[1].atomCount === 2) {
            addInstructions(`A més, com que queden dos hidrògens, <b>afegim també el prefix "di"</b>.`)
        }
    }

    if (["B", "P", "As", "Sb", "Si"].includes(usedFormula[1].letters)) {
        addInstructions(`Com que el ${formula[1].name} <b>es tracta d'una excepció</b> hem de revisar si es pot formar l'oxoàcid del qual prové emprant només una molècula d'aigua. Com que no és el cas <b>afegim el prefix "meta"</b>.`)
    }

    return (formula.length === 5 ? `${prefixos[formula[1].atomCount - 1]}hidrogen` : "")
        + (usedFormula[1].atomCount === 2 ? "di" : "")
        + (["B", "P", "As", "Sb", "Si"].includes(usedFormula[1].letters) ? "meta" : "")
        + `${oxoAcidName} de ${usedFormula[0].name}`
        + (valenciesSenseNegatiu.length !== 1 ? `(${intToRoman(hidrogenAtomCount.toString())})` : "")

}

export const calcHidrursNoMetalics = (formula, addInstructions) => {
    addInstructions("Quan l'hidrur es combina amb un no-metall, aquest últim actua amb la seva valència negativa, mentre que <b>l'hidrogen adopta la valència positiva</b>.")
    
    if (formula[1].valences[0] == -2) {
        addInstructions(`En aquest cas el <b>${formula[1].name}</b> té una valència de -2, per tant, <b>es necessiten dos hidrògens</b>.`)
    } else {
        addInstructions(`En aquest cas el <b>${formula[1].name}</b> té una valència de -1, per tant, <b>és suficient un hidrogen</b>.`)
    }

    addInstructions(`Aquest els escrivim emprant la <b>nomenclatura dels nombres d'oxidacions</b>, per tant, la posició dels elements del compost serà l'oposada en el compost formulat, deixant com a resultat: <b>${formula[1].plusUrName} d'hidrogen</b>`)
    return `${formula[1].plusUrName} d'hidrogen`
}

export const calcHidroxids = (formula, addInstructions) => {
    addInstructions(`Tenim un <b>metall (${formula[0].name})</b> combinat amb el <b>grup OH</b>, el qual forma un <b>hidròxid</b>. Això implica que la nomenclatura de <b>nombres d'oxidació</b> serà la preferent i començant el nom del compost amb "Hidroxid de".`)
    let valencesWithoutNegatives = formula[0].valences.map((x) => {
        if (x >= 0) { return x }
    })

    addInstructions(`La valència del grup OH és -1, per tant, multipliquem el nombre d'OH per -1: <b>-1*${formula[1][2].numOfMolecules}=-${formula[1][2].numOfMolecules}</b>`)

    console.log(formula)

    let result = "hidròxid de "
        + formula[0].name
        + (valencesWithoutNegatives.length !== 1 ? `(${intToRoman(formula[1][2].numOfMolecules)})` : "")

    addInstructions(`Atès que el grup OH té una càrrega total de -${formula[1][2].numOfMolecules}, <b>el ${formula[0].name} ha de tenir una valència de ${formula[1][2].numOfMolecules}</b> per equilibrar la càrrega. `
        + (valencesWithoutNegatives.length !== 1 ? `Com que té més d'una valència positiva, <b>cal indicar-la</b> al final del nom del compost, d'aquesta manera: ${result}` :
            `Com que el metall només té una valència positiva, <b>no cal indicar-la</b> al final del nom del compost, d'aquesta manera: ${result}`))

    return result
}

export const calcPrefixosMultiplicadors = (formula, addInstructions) => {
    addInstructions(`Com que es tracta d'una <b>combinació entre dos no-metalls, el ${formula[0].name} i el ${formula[1].name}</b>, utilitzarem la nomenclatura basada en els prefixos multiplicadors.`)
    const prefixos = ["", "di", "tri", "tetra", "penta", "hexa", "hepta", "octa", "nona", "deca"]

    let valencesWithoutNegatives = formula[0].valences.map((x) => {
        if (x >= 0) { return x }
    })

    let result = ((formula[1].atomCount == 1) && (valencesWithoutNegatives.length > 1) ? "mon" : prefixos[formula[1].atomCount - 1])
        + formula[1].plusUrName.replace("oxid", "òxid")
        + " de "
        + prefixos[formula[0].atomCount - 1]
        + formula[0].name

    addInstructions(`Per tant, invertim la posició dels elements i apliquem el prefix, obtenint el següent resultat: <b>${result}</b>.`)

    return result
}

export const calcNombreOxidacio = (formula, addInstructions) => {
    addInstructions(`Es tracta d'una combinació d'<b>un metall (${formula[0].name}) amb un no-metall (${formula[1].name})</b>, per tant, ho considerem una <b>sal binària</b>. Aquests composts tenen com a nomenclatura preferent la dels <b>nombres d'oxidació</b>.`)
    let valence2nElement = 0
    console.log(formula)
    formula[1].valences.forEach(num => {
        if (num < 0) { valence2nElement = num }
    })
    addInstructions(`Per a determinar la valència del ${formula[0].name}, multipliquem el nombre d'àtoms del ${formula[1].name} per la seva valencia negativa: <b>${formula[1].atomCount}*${valence2nElement}=${formula[1].atomCount * valence2nElement}</b>.`)

    let valenceMetall = (formula[1].atomCount * -1 * valence2nElement) / formula[0].atomCount

    if (formula[0].atomCount == 1) {
        addInstructions(`Ara sabem que per <b>equilibrar el compost</b>, el ${formula[0].name}, <b>ha de tenir una valència de +${valenceMetall}</b>, ja que només hi ha un àtom de ${formula[0].name}.`)
    } else {
        addInstructions(`Com que hi ha més d'un àtom de ${formula[0].name}, la seva valència <b>no serà ${formula[1].atomCount * valence2nElement * -1}</b>, sinó que <b>l'hem de dividir pel nombre d'àtoms: ${formula[1].atomCount * valence2nElement * -1}/${formula[0].atomCount}=${valenceMetall}</b>.`)
    }

    // Agafam les valències sense negatiu del primer element per veure si en queda més d'una
    let valencesWithoutNegatives = formula[0].valences.map((x) => {
        if (x >= 0) { return x }
    })

    let result = formula[1].plusUrName.replace("oxid", "òxid")
        + " de "
        + formula[0].name
        + (valencesWithoutNegatives.length !== 1 ? `(${intToRoman(valenceMetall.toString())})` : "")

    addInstructions(`Finalment, escrivim el compost <b>començat pel no-metall (acabat amb ur, "${formula[1].plusUrName}"), seguit del metall ("${formula[0].name}")</b> i, `
        + (valencesWithoutNegatives.length !== 1 ? `com que el ${formula[0].name} pot tenir diverses valències, <b>indiquem la seva entre parèntesis. El resultat és: ${result}</b>` :
            `com que el ${formula[0].name} només pot tenir una valència, no fa falta indicar-la. <b>El resultat és: ${result}</b>`))

    return result
}