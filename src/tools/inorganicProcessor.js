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

export const calcOxoacids = (formula) => {
    let valenceMiddleElement = -(formula[0].atomCount + (formula[2].atomCount * -2))

    let valencesWithoutNegatives = formula[1].valences.map((x) => {
        if (x >= 0) { return x }
    }).filter((x) => {
        if (x !== undefined) { return x }
    })

    // Excepcions dels oxoàcids
    if (["B", "P", "As", "Sb", "Si"].includes(formula[1].letters)) {
        // Crea l'oxoacid i després mira si es el mateix,
        // en el cas que no sigui el mateix asumeix que s'hi han afegit tres aigues

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
            return `àcid meta${formula[1].oxoAcidNames[valencesWithoutNegatives.indexOf(valenceMiddleElement) - 1]}`
        }
    }

    // Verificam si l'àcid está dimeritzat i tornam el resultat
    return "acid " +
        (formula[1].atomCount == 2 ?
            `di${formula[1].oxoAcidNames[valencesWithoutNegatives.indexOf(valenceMiddleElement / 2)]}` :
            `${formula[1].oxoAcidNames[valencesWithoutNegatives.indexOf(valenceMiddleElement)]}`)
}

export const calcOxosals = (formula) => {
    console.log("formulaa", formula)
    let possibleAtomCountOxigen = []
    let possibleAtomCountHidrogen = []
    let possibleAtomCountHidrogenException = []
    let possibleAtomCountOxigenException = []
    let valenceMultiplier = 1
    let valenceDivider = formula[0].atomCount
    const prefixos = ["", "di", "tri", "tetra", "penta", "hexa", "hepta", "octa", "nona", "deca"]

    // Verificam si hi ha més d'una molècula de l'anió oxoàcid,
    // en aquell cas revertim el procés que es du a terme en la funció de dividir la fórmula
    if (Object.prototype.toString.call(formula[1]) === '[object Array]') {
        if (formula[1].length === 4) {
            valenceMultiplier = formula[1][3].numOfMolecules
            formula = [formula[0], formula[1][0], formula[1][1], formula[1][2], formula[2]]
            formula[3].atomCount = formula[3].atomCount / valenceMultiplier
        } else {
            valenceMultiplier = formula[1][2].numOfMolecules
            formula = [formula[0], formula[1][0], formula[1][1]]
        }
        formula[1].atomCount = formula[1].atomCount / valenceMultiplier
        formula[2].atomCount = formula[2].atomCount / valenceMultiplier
    }

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
        }

        hidrogenAtomCount = (formula.length === 5 ? hidrogenAtomCount - formula[1] : hidrogenAtomCount)

        oxoAcidName = oxoAcidName.replace("urós", "it")
        oxoAcidName = oxoAcidName.replace("uric", "at")
        oxoAcidName = oxoAcidName.replace("úros", "it")
        oxoAcidName = oxoAcidName.replace("úric", "at")
        oxoAcidName = oxoAcidName.replace("òric", "at")
        oxoAcidName = oxoAcidName.replace("orós", "it")

        if (["ós", "ic"].includes(oxoAcidName.slice(-2))) {
            oxoAcidName = oxoAcidName.replace("ós", "it").replace("ic", "at")
        }

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

    hidrogenAtomCount = (formula.length === 5 ? hidrogenAtomCount - formula[1] : hidrogenAtomCount)

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

    return (formula.length === 5 ? `${prefixos[formula[1].atomCount - 1]}hidrogen` : "")
        + (usedFormula[1].atomCount === 2 ? "di" : "")
        + (["B", "P", "As", "Sb", "Si"].includes(usedFormula[1].letters) ? "meta" : "")
        + `${oxoAcidName} de ${usedFormula[0].name}`
        + (valenciesSenseNegatiu.length !== 1 ? `(${intToRoman(hidrogenAtomCount.toString())})` : "")

}

export const calcHidrursNoMetalics = (formula) => {
    return `${formula[1].plusUrName} d'hidrogen`
}

export const calcHidroxids = (formula) => {
    let valencesWithoutNegatives = formula[0].valences.map((x) => {
        if (x >= 0) { return x }
    })

    return "hidròxid de "
        + formula[0].name
        + (valencesWithoutNegatives.length !== 1 ? `(${intToRoman(formula[1][0].atomCount)})` : "")
}

export const calcPrefixosMultiplicadors = (formula) => {
    const prefixos = ["", "di", "tri", "tetra", "penta", "hexa", "hepta", "octa", "nona", "deca"]

    let valencesWithoutNegatives = formula[0].valences.map((x) => {
        if (x >= 0) { return x }
    })

    return ((formula[1].atomCount == 1) && (valencesWithoutNegatives.length > 1) ? "mon" : prefixos[formula[1].atomCount - 1])
        + formula[1].plusUrName
        + " de "
        + prefixos[formula[0].atomCount - 1]
        + formula[0].name
}

export const calcNombreOxidacio = (formula) => {
    let valence2nElement = 0

    formula[1].valences.forEach(num => {
        if (num < 0) { valence2nElement = num }
    })

    let valenceMetall = (formula[1].atomCount * -1 * valence2nElement) / formula[0].atomCount

    // Agafam les valències sense negatiu del primer element per veure si en queda més d'una
    let valencesWithoutNegatives = formula[0].valences.map((x) => {
        if (x >= 0) { return x }
    })

    return formula[1].plusUrName
        + " de "
        + formula[0].name
        + (valencesWithoutNegatives.length !== 1 ? `(${intToRoman(valenceMetall.toString())})` : "")
}