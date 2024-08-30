export const organicProcessor = (nom) => {
    let prefixes = ["met", "et", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec", "undec", "dodec", "tridec", "tetradec", "pentadec", "hexadec", "heptadec", "octadec"]
    let buffer = ""
    let tempNumber = []
    let tempPrefix = 0
    let lastComa = false
    let lastNumber = false
    let outputData = [
        {
            "carbons": 0,
            "doubleBonds": [],
            "tripleBonds": [],
            "ciclo": false,
            "extra": [],
            "fluor": [],
            "clor": [],
            "brom": [],
            "iode": [],
        },
        []
    ]
    nom = nom.replace("di", "").replace("tri", "").replace("tetra", "").replace("penta", "").replace("hexa", "")

    for (let i in nom) {
        buffer += nom[i].replace("-", "")

        if (prefixes.includes(buffer)) {
            tempPrefix = prefixes.indexOf(buffer) + 1
            lastNumber = false;
            buffer = ""
        } else {
            switch (buffer) {
                case "benzè":
                    outputData[0].ciclo = true
                    outputData[0].carbons = 6
                    outputData[0].doubleBonds = [1, 3, 5]
                    buffer = ""
                    break
                case "bromo":
                    if (tempNumber != []) {
                        for (let k in tempNumber) {
                            outputData[0].extra.push(["Br", tempNumber[k]])
                            outputData[0].brom.push(tempNumber[k])
                        }
                    } else {
                        outputData[0].extra.push(["Br", 1])
                        outputData[0].brom.push(1)
                    }
                    tempNumber = []
                    buffer = ""
                    break
                case "cloro":
                    if (tempNumber != []) {
                        for (let k in tempNumber) {
                            outputData[0].clor.push(tempNumber[k])
                        }
                    } else {
                        outputData[0].clor.push(1)
                    }
                    tempNumber = []
                    buffer = ""
                    break
                case "fluoro":
                    if (tempNumber != []) {
                        for (let k in tempNumber) {
                            outputData[0].fluor.push(tempNumber[k])
                        }
                    } else {
                        outputData[0].fluor.push(1)
                    }
                    tempNumber = []
                    buffer = ""
                    break
                case "iodo":
                    if (tempNumber != []) {
                        for (let k in tempNumber) {
                            outputData[0].iode.push(tempNumber[k])
                        }
                    } else {
                        outputData[0].iode.push(1)
                    }
                    tempNumber = []
                    buffer = ""
                    break
                case "à":
                    outputData[0].carbons = tempPrefix
                    buffer = ""
                    break
                case "è":
                    outputData[0].carbons = tempPrefix
                    outputData[0].doubleBonds = tempNumber.length == 0 ? [1] : tempNumber
                    buffer = ""
                    break
                case "í":
                    outputData[0].carbons = tempPrefix
                    outputData[0].tripleBonds = tempNumber.length == 0 ? [1] : tempNumber
                    buffer = ""
                    break
                case "il":
                    outputData[1].push({
                        "carbons": tempPrefix,
                        "position": (tempNumber != [] ? tempNumber : [1])
                    })
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
    return outputData
}