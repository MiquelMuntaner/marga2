export const organicProcessor = (nom) => {
    let prefixes = ["met", "et", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec", "undec", "dodec", "tridec", "tetradec", "pentadec", "hexadec", "heptadec", "octadec"]

    let buffer = ""
    let tempNumber = 0
    let tempPrefix = 0
    let tempPrefix1 = 0
    let outputData = [
        {
            "carbons": 0,
            "doubleBonds": [],
            "tripleBonds": []
        }
    ]

    for (let i in nom) {
        buffer += nom[i]

        console.log("tempPrefix", tempPrefix1)
        console.log("replaced", buffer.replace("-", ""))
        if (prefixes.includes(buffer)) {
            console.log("prefixbuffer", prefixes.indexOf(buffer))
            tempPrefix1 = prefixes.indexOf(buffer) + 1
            buffer = ""
        }

        if (tempPrefix != 0) {
            if (buffer = "à") {
                outputData[0].carbons = tempPrefix
            } else if (buffer = "è") {
                console.log("double", tempNumber)
                outputData[0].carbons = tempPrefix
                outputData[0].doubleBonds = [tempNumber == 0 ? 1 : tempNumber]
            } else if (buffer = "í") {
                outputData[0].carbons = tempPrefix
                outputData[0].tripleBonds = [1]
            } else if (buffer.charAt(buffer.length - 1) == "-" && buffer.replace("-", "").match(/^[0-9]+$/)) {
                tempNumber = parseInt(buffer.replace("-", ""))
                console.log("tempNumbeeer", tempNumber)
                buffer = ""
            }
        }

        console.log(outputData)
    }
}