const Utilities = {
    toGenName(genTag) {
        let generation = genTag.split("-")
        return generation[0][0].toUpperCase() + generation[0].substr(1) + ' ' + generation[1].toUpperCase()
    },
    toPokemonName(pokeTag) {
        return pokeTag[0].toUpperCase() + pokeTag.substr(1)
    },
    heightConvert(height) {
        let heightInches = height / .25
        let heightFeet = (heightInches / 12).toString()
        let number = heightFeet
        if (heightFeet.includes(".")) {
            number = heightFeet.split('.')
        }
        let feet = number[0]
        let inches = number[1] > 0 ? (number[1] * 12).toString()[0] : 0
        return feet + `'` + inches + `"`
    },
    weightConvert(weight) {
        let weightLbs = weight / 4.54
        let newWeight = parseFloat(weightLbs).toFixed(1)
        return newWeight + ' lbs'
    },
    convertTag(tag) {
        let newArray = []
        let newTag = tag.toString()
        if (newTag.includes('-')) {
            newArray = newTag.split("-")
            let longTag = []
            for (let i = 0; i < newArray.length; i++) {
                longTag.push(newArray[i][0].toUpperCase() + newArray[i].substr(1))
            }
            return longTag.join(" ")
        }
        else {
            return newTag[0].toUpperCase() + newTag.substr(1)
        }
    },
    convertSpriteTag(tag) {
        let newArray = []
        let newTag = tag.toString()
        if (newTag.includes('_')) {
            newArray = newTag.split("_")
            let longTag = []
            for (let i = newArray.length - 1; i >= 0; i--) {
                if (i===0 && newArray[i]) {
                    longTag.push("(" + newArray[i] + ")")
                }
                else {
                    longTag.push(newArray[i][0].toUpperCase() + newArray[i].substr(1))
                }
            }
            return longTag.join(" ")
        }
        else {
            return newTag[0].toUpperCase() + newTag.substr(1)
        }
    }
}
export default Utilities