import { Settings } from "react-native"

const default_address = "https://127.0.0.1:8099"

export const getServerAddress = () => {
    const stored = Settings.get("address")
    return stored ? stored : default_address
}

export const setServerAddress = (newAddress) => {
    Settings.set({address: newAddress})
}