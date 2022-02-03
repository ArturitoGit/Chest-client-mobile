import { getServerAddress } from "../data/serverAddress"

export const sendPostRequest = async (route, params) => {

    const address = getServerAddress()

    console.log(`send request to ${address}/${route} with params : ${JSON.stringify(params)}`)

    const response = await fetch(`${address}/${route}`, {
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })

    const json = await response.json()

    console.log(`Received : ${JSON.stringify(json)} from the server`)

    return json

}