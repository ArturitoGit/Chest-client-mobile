import { Settings } from "react-native"

export const getPreviousUsername = () => {

    const previous = Settings.get("username")
    
    return {
        isPresent: previous == null,
        username: previous
    }

}

export const setPreviousUsername = (username) => {
    Settings.set({username: username})
}