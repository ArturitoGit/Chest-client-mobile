import Slider from "@react-native-community/slider"
import { useState } from "react"
import { ActivityIndicator, Button, StyleSheet, Switch, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { disconnectUser } from "../domain/pipelines/DisconnectUser"
import { generatePassword } from "../domain/pipelines/GeneratePassword"

import { Style, DismissKeyBoard } from "../assets/style/Style"
import { editAccount } from "../domain/pipelines/EditAccount"
import { createAccount } from "../domain/pipelines/CreateAccount"

export const PasswordScreen = ({navigation, route}) => {

    // Get the params from the request
    const initial_account = route.params.account ;
    const parent = route.params.parent ;

    // Use it to build the page password variable
    const initial_password = parent == Parent.CREATE ? "Votre mot de passe" : initial_account.clearPassword
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
    const [isOnePasswordPresent, setIsOnePasswordPresent] = useState(parent == Parent.EDIT)

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
                    setIsOnePasswordPresent(true)
                    setPassword(result.password) ;
                    return
                })
    }

    const validate = () => {
        // Create new account object
        var newAccount = {...initial_account}
        newAccount.clearPassword = password
        editAccount(newAccount).then(result => {
            if (!result.success) {
                // TODO
                return
            }
            navigation.navigate("Account", {accountId: initial_account.id })
        })
    }

    return (
        <DismissKeyBoard>
        <SafeAreaView style={password_style.container}>

            {/* Password preview */}
            <View style={{height: 50}}>
                {isLoading ? <ActivityIndicator/> :
                    <Text style={password_style.preview}>{password}</Text>
                }
            </View>

            {/* Forced content */}
            <TextInput
                style={password_style.text_input}
                placeholder="Determinated content"
                value={forcedContent}
                onChangeText={setForcedContent}
                keyboardType="ascii-capable"
            />
                
            <View style={[password_style.page_component]}>
                <Text style={Style.label}>Content :</Text>
                <View style={password_style.contentContainer}>
                {/* Content selectors */}
                    <ContentSwitch
                        label="AAA"
                        value={upperEnabled}
                        onValueChange={setUpperEnabled}
                        />
                    <ContentSwitch
                        label="aaa"
                        value={lowerEnabled}
                        onValueChange={setLowerEnabled}
                        />
                    <ContentSwitch
                        label="123"
                        value={numbersEnabled}
                        onValueChange={setNumbersEnabled}
                        />
                    <ContentSwitch
                        label="#@?"
                        value={symbolsEnabled}
                        onValueChange={setSymbolsEnabled}
                        />
                </View>
            </View>

            {/* Length selector */}
            <View style={[password_style.page_component]}>
                <Text style={Style.label}>Length : {length}</Text>
                <Slider
                    style={password_style.slider}
                    minimumValue={5}
                    maximumValue={15}
                    step={1}
                    onValueChange={setLength}
                    value={length}
                />
            </View>

            <View style={{flexDirection:"row", justifyContent: "space-around"}}>
                {/* Generate button */}
                <Button
                    title="Generate"
                    onPress={generate}
                />

                {/* Validate button */}
                <Button
                    title="Validate"
                    disabled={!isOnePasswordPresent}
                    onPress={parent == Parent.CREATE ? 
                        () => onCreatePasswordGenerated(navigation, initial_account, password) : 
                        () => onEditPasswordGenerated(navigation, initial_account, password)
                    }
                />
            </View>

        </SafeAreaView>
    </DismissKeyBoard>
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

function getNewAccount (initialAccount, newPassword) {
    var newAccount = {...initialAccount}
    newAccount.clearPassword = newPassword
    return newAccount
}

function onEditPasswordGenerated (navigation, initialAccount, newPassword) {
    var account = getNewAccount(initialAccount, newPassword)
    editAccount(account).then(result => {
        if(!result.success) {
            disconnectUser(navigation) ;
            return
        }
        console.log("account edited : " + JSON.stringify(account))
        // Redirect to the account detailed view of the account
        navigation.navigate("Account", account.id)
    })
}

function onCreatePasswordGenerated (navigation, initialAccount, newPassword) {
    var account = getNewAccount(initialAccount, newPassword)
    // Send request to create the password
    createAccount().then(result => {
        if (!result.success) {
            disconnectUser(navigation) ;
            return
        }
        console.log("account created : " + JSON.stringify(account))
        // Redirect to accounts
        navigation.navigate("Accounts", {})
    })
}

// Page style
const password_style = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        height: "100%",
        flexDirection: "column",
        justifyContent: 'space-evenly'
    },
    preview: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 35
    },
    text_input: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        marginVertical: 20
    },
    slider: {
        marginVertical: 10,
        width: "75%",
        alignSelf: "center"
    },
    contentSwitch: {
        alignItems: "center",
        marginVertical: 8,
        width: "40%"
    },
    switchLabel: {
        marginBottom: 5
    },
    contentContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    }
})

export const Parent = {
    CREATE: 0,
    EDIT: 1
}