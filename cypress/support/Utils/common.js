export let RgEquipamentoRandom = () => {
    return JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)
}

export let NfRandom = () => {
    return Math.floor(Math.random() * (90000000 - 10000000)) + '/' + 345
}