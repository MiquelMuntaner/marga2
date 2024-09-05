const replaceAll = (str, find, replace) => {
    return str.replace(new RegExp(find, 'g'), replace);
}

const replaceList = (str, list) => {
    let output = str
    for (let i in list) {
        console.log("output: ", output, list[i])
        if (["di", "tri", "tetra", "penta", "hexa"].includes(list[i])) {
            if (!str.includes(list[i] + "l")) {
                console.log("dimarts", list[i] + "l")
                output = replaceAll(output, list[i], "")
            }
        } else {
            output = replaceAll(output, list[i], "")
        }
    }

    return output
}

export const organicProcessor = (nom) => {
    let prefixes = ["met", "et", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec", "undec", "dodec", "tridec", "tetradec", "pentadec", "hexadec", "heptadec", "octadec"]
    let buffer = ""
    let tempNumber = []
    let tempPrefix = 0
    let lastComa = false
    let lastNumber = false
    let eterBuffer = null
    let ester = false
    let outputData = [
        {
            "carbons": 0,
            "doubleBonds": [],
            "tripleBonds": [],
            "ciclo": false,
            "eter": null,
            "extra": [],
            "aldehid": false,
            "ester": null,
            "acidCarboxilic": false,
            "amida": false,
        },
        []
    ]
    // nom = nom.replace("an", "").replace("di", "").replace("tri", "").replace("tetra", "").replace("penta", "").replace("hexa", "").replace(" ", "")

    nom = replaceList(nom.toLowerCase(), ["an", "di", "tri", "tetra", "penta", "hexa", "àcid", " ", "de", "d'"])
    console.log("nom: ", nom)
    for (let i in nom) {
        buffer += nom[i].replace("-", "")
        console.log("eter buffer", buffer)

        if (prefixes.includes(buffer)) {
            tempPrefix = prefixes.indexOf(buffer) + 1
            lastNumber = false;
            buffer = ""
        } else {
            switch (buffer) {
                case "èter":
                    eterBuffer = 0
                    buffer = ""
                    break
                case "ílic":
                    if (outputData[0].carbons == 0) {
                        outputData[0].carbons = tempPrefix
                        outputData[0].eter = tempPrefix
                    }
                    eterBuffer = tempPrefix
                    buffer = ""
                    break
                case "oxi":
                    eterBuffer = tempPrefix
                    outputData[0].eter = tempPrefix
                    buffer = ""
                    break
                case "benzè":
                    outputData[0].ciclo = true
                    outputData[0].carbons = 6
                    outputData[0].doubleBonds = [1, 3, 5]
                    buffer = ""
                    break
                case "bromo":
                    if (tempNumber.length !== 0) {
                        for (let k in tempNumber) {
                            outputData[0].extra.push(["Br", tempNumber[k]])
                        }
                    } else {
                        outputData[0].extra.push(["Br", 1])
                    }
                    tempNumber = []
                    buffer = ""
                    break
                case "cloro":
                    if (tempNumber.length !== 0) {
                        for (let k in tempNumber) {
                            outputData[0].extra.push(["Cl", tempNumber[k]])
                        }
                    } else {
                        outputData[0].extra.push(["Cl", 1])
                    }
                    tempNumber = []
                    buffer = ""
                    break
                case "fluoro":
                    if (tempNumber.length !== 0) {
                        for (let k in tempNumber) {
                            outputData[0].extra.push(["F", tempNumber[k]])
                        }
                    } else {
                        outputData[0].extra.push(["F", 1])
                    }
                    tempNumber = []
                    buffer = ""
                    break
                case "iodo":
                    if (tempNumber.length !== 0) {
                        for (let k in tempNumber) {
                            outputData[0].extra.push(["I", tempNumber[k]])
                        }
                    } else {
                        outputData[0].extra.push(["I", 1])
                    }
                    tempNumber = []
                    buffer = ""
                    break
                case "ol":
                    outputData[0].carbons = tempPrefix
                    if (tempNumber.length !== 0) {
                        for (let k in tempNumber) {
                            outputData[0].extra.push(["OH", tempNumber[k]])
                        }
                    } else {
                        outputData[0].extra.push(["OH", 1])
                    }
                    buffer = ""
                    break
                case "amina":
                    if (tempNumber.length !== 0) {
                        for (let k in tempNumber) {
                            outputData[0].extra.push(["N", tempNumber[k]])
                        }
                    } else {
                        outputData[0].extra.push(["N", 1])
                    }
                    outputData[0].carbons = tempPrefix
                    buffer = ""
                    break
                case "ona":
                    if (i == nom.length - 1) {
                        outputData[0].carbons = tempPrefix

                        if (tempNumber.length !== 0) {
                            for (let k in tempNumber) {
                                outputData[0].extra.push(["cetona", tempNumber[k]])
                            }
                        } else {
                            outputData[0].extra.push(["cetona", 1])
                        }

                        buffer = ""
                    }
                    break
                case "oat":
                    outputData[0].carbons = tempPrefix
                    ester = true
                    outputData[0].ester = tempPrefix
                    tempPrefix = 0
                    buffer = ""
                    break
                case "oic":
                    if (i == nom.length - 1) {
                        outputData[0].carbons = tempPrefix
                        outputData[0].acidCarboxilic = true
                    }
                    break
                case "amida":
                    if (i == nom.length - 1) {
                        outputData[0].carbons = tempPrefix
                        outputData[0].amida = true
                    }
                    break
                case "à":
                    outputData[0].carbons = tempPrefix
                    buffer = ""
                    break
                case "è":
                    if (i == nom.length - 1) {
                        console.log("ja som auqi")
                        outputData[0].carbons = tempPrefix
                        outputData[0].doubleBonds = tempNumber.length == 0 ? [1] : tempNumber
                        buffer = ""
                    }
                    break
                case "í":
                    if (i == nom.length - 1) {
                        outputData[0].carbons = tempPrefix
                        outputData[0].tripleBonds = tempNumber.length == 0 ? [1] : tempNumber
                        buffer = ""
                    }
                    break
                case "al":
                    if (i == nom.length - 1) {
                        outputData[0].aldehid = true
                        outputData[0].carbons = tempPrefix
                        buffer = ""
                    }
                    break
                case "il":
                    if (ester == true) {
                        outputData[0].carbons = outputData[0].carbons + tempPrefix
                    } else if (eterBuffer == null) {
                        outputData[1].push({
                            "carbons": tempPrefix,
                            "position": (tempNumber != [] ? tempNumber : [1])
                        })
                    } else {
                        outputData[0].carbons = tempPrefix
                        if (outputData[0].eter === null) {
                            console.log("adding eter", tempPrefix)
                            outputData[0].eter = tempPrefix
                        }
                    }
                    tempPrefix = 0;
                    tempNumber = []
                    buffer = "";
                    break
                case ",":
                    lastComa = true
                    buffer = ""
                    break
                case "ciclo":
                    outputData[0].ciclo = true
                    buffer = ""
                default:
                    if (buffer.match(/^[0-9]+$/) && lastComa == false && lastNumber == true) {
                        tempNumber[tempNumber.length] = parseInt(tempNumber[tempNumber.length].toString() + buffer)
                        buffer = ""
                    } else if (buffer.match(/^[0-9]+$/) && lastNumber == false) {
                        tempNumber.push(parseInt(buffer))
                        lastComa = false
                        buffer = ""
                    }

            }
            lastNumber = buffer.match(/^[0-9]+$/) ? true : false
        }
    }

    if (eterBuffer !== null) {
        console.log("PUTA ETER BUFFER2", eterBuffer)
        outputData[0].carbons += eterBuffer
    }
    return outputData
}