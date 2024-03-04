import { data } from "../data";
import { romanToInt } from "./romanToInt";

export const nameSplitter = (formulaName) => {
    let splitedName = formulaName.toLowerCase().split(" ")
    let valence = 0
    let isAcidException = false
    let isAcidicSalt = false
    let outputFormula = []

    // Eliminam els accents per evitar posteiors errors, apart revisam si es una excepció d'oxoàcid
    splitedName = splitedName.map((text) => {
        if (text.includes("meta")) { isAcidException = true }
        return removeAccentMark(text).replace("d'", "").replace("d’", "").replace("orto", "").replace("meta", "")
    })

    // Eliminam la paraula "de"
    if (splitedName.indexOf("de") > -1) {
        splitedName.splice(splitedName.indexOf("de"), 1)
    }

    // Seperant els nombres romans de la darrera paraula i guardam el valor a la var valence
    if (splitedName[splitedName.length - 1].split("(").length !== 1) {
        let lastElement = splitedName.pop()
        splitedName.push(lastElement.split("(")[0])
        valence = romanToInt(lastElement.split("(")[1].substring(0, lastElement.split("(")[1].length - 1).toUpperCase())
    }


    // Eliminam els prefixos multiplicados i guardam l'informació per finalment inserir-le
    const prefixos = ["mon", "di", "tri", "tetra", "penta", "hexa", "hepta", "octa", "nona", "deca"]
    let atomCountData = []

    for (let i in splitedName) {
        for (let j in prefixos) {
            if (splitedName[i].slice(0, prefixos[j].length) === prefixos[j]) {
                atomCountData.push(parseInt(j) + 1)
                splitedName[i] = splitedName[i].slice(prefixos[j].length)
            }
        }

        if (atomCountData[i] === undefined) {
            atomCountData.push(null)
        }
    }

    // Verificam si son sals acides i eliminam "hidrogen" en el cas de que ho siguin
    if (splitedName[0].includes("hidrogen") && splitedName[0].length > 8) {
        splitedName[0] = splitedName[0].replace("hidrogen", "")
        isAcidicSalt = true
    }

    // Analitzam un per un els elements per a generar un diccioanri com el descir al final del document
    // L'algoritma es inneficient, però l'escala a la que opera fa que no sigui una preoucpació
    for (let i in splitedName) {

        for (let j in data) {
            if (removeAccentMark(data[j].name.toLowerCase()) == splitedName[i]) {
                outputFormula.push(addData({
                    "atomData": data[j],
                    "chemicalSymbol": j,
                    "atomCount": atomCountData[i]
                }))


            } else if (removeAccentMark(data[j].plusUrName.toLowerCase()) == splitedName[i]) {
                outputFormula.push(addData({
                    "atomData": data[j],
                    "chemicalSymbol": j,
                    "plusUrName": true,
                    "atomCount": atomCountData[i]
                }))
            } else {
                // Revisam totes les posibilitats dels oxoacids
                for (let k in data[j].oxoAcidNames) {
                    if (removeAccentMark(data[j].oxoAcidNames[k].toLowerCase()) == splitedName[i]) {
                        outputFormula.push(addData({
                            "atomData": data[j],
                            "chemicalSymbol": j,
                            "oxoAcidNumber": parseInt(k),
                            "atomCount": atomCountData[i]
                        }))
                    }

                    // A partir del nom de l'oxoacid, verificam si es tracta de una oxosal
                    let tempOxosal = removeAccentMark(data[j].oxoAcidNames[k])

                    tempOxosal = tempOxosal.replace("uric", "at")
                    tempOxosal = tempOxosal.replace("uros", "it")
                    tempOxosal = tempOxosal.replace("oric", "at")
                    tempOxosal = tempOxosal.replace("oros", "it")

                    if (["os", "ic"].includes(tempOxosal.slice(-2))) {
                        tempOxosal = tempOxosal.slice(0, tempOxosal.length - 2) + tempOxosal.slice(-2).replace("os", "it").replace("ic", "at")
                    }

                    if (tempOxosal === splitedName[i]) {
                        outputFormula.push(addData({
                            "atomData": data[j],
                            "chemicalSymbol": j,
                            "oxoSalNumber": parseInt(k),
                            "atomCount": atomCountData[i]
                        }))
                    }
                }
            }
        }
    }

    // Cream el darrer diccionari, que contè informació extra
    outputFormula.push({
        "isAcid": (splitedName[0].toLowerCase() === "acid" ? true : false),
        "isHidroxid": (splitedName[0].toLowerCase() === "hidroxid" ? true : false),
        "romanNumbers": (valence !== 0 ? valence : null),
        "isAcidException": isAcidException,
        "isSalAcida": isAcidicSalt,
    })

    return outputFormula
}

const addData = ({
    atomData,
    chemicalSymbol,
    plusUrName = false,
    oxoAcidNumber = null,
    oxoSalNumber = null,
    atomCount = null,
}) => (
    {
        "name": atomData.name,
        "valences": atomData.valences,
        "isMetall": atomData.isMetall,
        "plusUrName": plusUrName,
        "oxoAcidNumber": oxoAcidNumber,
        "oxoSalNumber": oxoSalNumber,
        "chemicalSymbol": chemicalSymbol,
        "atomCount": atomCount,
        "molarMass": atomData.molarMass,
    }
)

// Eliminar accents i altres diacritics
export const removeAccentMark = (text) => {
    return text
        .normalize('NFD')
        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
        .normalize();
}