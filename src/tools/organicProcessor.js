export const organicProcessor = (nom) => {
    let prefixes = ["met", "et", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec", "undec", "dodec", "tridec", "tetradec", "pentadec", "hexadec", "heptadec", "octadec"]

    let buffer = ""
    let tempNumber = []
    let tempPrefix = 0
    let tempPrefix1 = 0
    // True if the last character was a coma
    let coma = false
    // True if the last character was a number
    let lastNumber = false
    let outputData = [
        {
            "carbons": 0,
            "doubleBonds": [],
            "tripleBonds": []
        },
        []
    ]

    for (let i in nom) {
        buffer += nom[i].replace("-", "")

        console.log("buffer", buffer)
        if (prefixes.includes(buffer)) {
            tempPrefix1 = prefixes.indexOf(buffer) + 1
            console.log("prefiix", tempPrefix)
            lastNumber = false;
            buffer = ""
        } else {
            if (buffer == "à") {
                outputData[0].carbons = tempPrefix1
                lastNumber = false
                buffer = ""
            } else if (buffer == "è") {
                outputData[0].carbons = tempPrefix1
                outputData[0].doubleBonds = tempNumber == [] ? [1] : tempNumber
                lastNumber = false
                buffer = ""
            } else if (buffer == "í") {
                outputData[0].carbons = tempPrefix1
                outputData[0].tripleBonds = tempNumber == [] ? [1] : tempNumber
                lastNumber = false
                buffer = ""
            } else if (buffer == "il") {
                outputData[1].push({
                    "carbons": tempPrefix1,
                    "position": tempNumber
                })
                tempPrefix1 = 0;
                tempNumber = []
                buffer = "";
            } else if (buffer == ",") {
                coma = true
                lastNumber = false
                buffer = ""
            } else if (buffer.match(/^[0-9]+$/)) {
                if (coma == false && lastNumber == true) {
                    console.log("aquii")
                    tempNumber[tempNumber.length] = parseInt(tempNumber[tempNumber.length].toString() + buffer)

                } else if (lastNumber == false) {
                    tempNumber.push(parseInt(buffer))
                    coma = false
                }
                lastNumber = true
                buffer = ""
            }
        }
    }
    console.log(outputData)
    return outputData
}