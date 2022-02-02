
var address = "https://127.0.0.1:8099"

export const getServerAddress = () => {
    console.log(`Get server address request ; return : ${address}`)
    return address
}

export const setServerAddress = (newAddress) => {
    console.log(`Set server address request ; set to ${newAddress}`)
    address = newAddress
}