import Slider from "@react-native-community/slider"
import { useState } from "react"
import { ActivityIndicator, Button, StyleSheet, Switch, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { disconnectUser } from "../domain/pipelines/DisconnectUser"
import { generatePassword } from "../domain/pipelines/GeneratePassword"

export const PasswordScreen = ({navigation, route}) => {

    // Get the password from the request
    var initial_password = route.params.password

    // Use it to build the page password variable
    const [password, setPassword] = useState(initial_password)

    // Generate password request variables
    const [length, setLength] = useState(10) ;
    const [upperEnabled, setUpperEnabled] = useState(true) ;
    const [lowerEnabled, setLowerEnabled] = useState(true) ;
    const [symbolsEnabled, setSymbolsEnabled] = useState(true) ;
    const [numbersEnabled, setNumbersEnabled] = useState(true) ;
    const [forcedContent, setForcedContent] = useState("") ;

    // Page state
    const [isLoading, setLoading] = useState(false) ;

    // Send a request to generate a password then display it on the page
    const generate = () => {
        setLoading(true)
        generatePassword(
            length, 
            upperEnabled, 
            lowerEnabled, 
            numbersEnabled, 
            symbolsEnabled, 
            forcedContent)
                .then(result => {
                    if (!result.success) {
                        disconnectUser(navigation) ;
                        return
                    }
                    setLoading(false)
                    setPassword(result.password) ;
                    return
                })
    }

    return (
        <SafeAreaView style={password_style.container}>

            {/* Password preview */}
            <View>
                {isLoading ? <ActivityIndicator/> :
                    <Text style={password_style.preview}>{password}</Text>
                }
            </View>

            {/* Length selector */}
            <View style={{flexDirection:"row", alignItems: "center"}}>
                <Text style={{flex: 1}}>Length : {length}</Text>
                <Slider
                    style={password_style.slider}
                    minimumValue={5}
                    maximumValue={15}
                    step={1}
                    onValueChange={setLength}
                    value={length}
                />
            </View>

            {/* Content selectors */}
            <ContentSwitch
                label="Enable upper-case letters"
                value={upperEnabled}
                onValueChange={setUpperEnabled}
            />
            <ContentSwitch
                label="Enable lower-case letters"
                value={lowerEnabled}
                onValueChange={setLowerEnabled}
            />
            <ContentSwitch
                label="Enable numbers"
                value={numbersEnabled}
                onValueChange={setNumbersEnabled}
            />
            <ContentSwitch
                label="Enable symbols"
                value={symbolsEnabled}
                onValueChange={setSymbolsEnabled}
            />

            {/* Forced content */}
            <TextInput
                style={password_style.text_input}
                placeholder="Enter forced content here ..."
                value={forcedContent}
                onValueChange={setForcedContent}
            />

            <View style={{flexDirection:"row", justifyContent: "center"}}>
                {/* Generate button */}
                <Button
                    title="Generate"
                    onPress={generate}
                />

                {/* Validate button */}
                <Button
                    title="Validate"
                    onPress={() => {}}
                />
            </View>

        </SafeAreaView>
    )
}

// Components contains a label and a switch
const ContentSwitch = ({label, onValueChange, value}) => {
    return (
        <View style={password_style.contentSwitch}>
            <Text style={password_style.switchLabel}>{label}</Text>
            <Switch
                onValueChange={onValueChange}
                value={value}
            />
        </View>
    )
}

// Page style
const password_style = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    preview: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25,
    },
    text_input: {
        backgroundColor: "white",
        padding: 5,
        borderRadius: 5,
        marginVertical: 20
    },
    slider: {
        marginVertical: 20,
        flex: 3
    },
    contentSwitch: {
        alignItems: "center",
        marginVertical: 8
    },
    switchLabel: {
        marginBottom: 5
    }
})