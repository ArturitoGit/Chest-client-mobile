// React native imports
import React, { useState, useRef } from "react";
import { Text, View, TextInput, StyleSheet, Button, ActivityIndicator, Alert, ActionSheetIOS } from 'react-native' ;
import { getPreviousUsername } from '../domain/data/username';

import { Style } from "../assets/style/Style";

// Internal functions
import { login } from "../domain/pipelines/Login" ;
import { getServerAddress, setServerAddress } from "../domain/data/serverAddress";

// Page content
export const LoginScreen = ({ navigation }) => {

    // Add right button to the header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => displayOptions(navigation)} title="Options"/>
            ),
            headerTitle: ""
        })
    }, [navigation])


    // Get the previous username
    const previousUsernameResponse = getPreviousUsername()
    const previousUsername = previousUsernameResponse.isPresent ? previousUsernameResponse.username : ""

    const passwordInputField = useRef() ;
    
    // Field content variables
    const [username, onUsernameChange] = useState(previousUsername)
    const [password, onPasswordChange] = useState("")

    const [state, setState] = useState(STATE.READY) ;
    const [info, setInfo] = useState("") ;

    const submit = () => onLoginPressed({
        navigation: navigation,
        username: username,
        password: password,
        setState: setState, 
        setError: setInfo
    })

    return (
        <View style={login_style.container}>
            
            {/* Username field */}
            <Text style={[Style.label, login_style.label]}>Username : </Text>
            <TextInput 
                autoCapitalize = {"none"}
                style={login_style.input}
                onChangeText={onUsernameChange}
                value={username}
                onSubmitEditing={() => { passwordInputField.current.focus(); }}
            />

            {/* Password field */}
            <Text style={[Style.label, login_style.label]}>Password : </Text>
            <TextInput 
                ref={passwordInputField}
                style={login_style.input} 
                secureTextEntry={true}
                onChangeText={onPasswordChange}
                value={password}
                onSubmitEditing={submit}
            />

            {/* Info field */}
            {
                state == STATE.FETCHING ?
                    <ActivityIndicator/>
                :
                (<Text 
                    style={
                        // Style of the info field depending of the state of the screen
                        state == STATE.FETCHING ? login_style.info :
                        state == STATE.FAILED ? [login_style.info, login_style.error] :
                        []
                    }
                >
                    {info}
                </Text>)
            }

            {/* Login button */}
            <Button
                onPress={submit}
                title="Login"
            />
        </View>
    ) ;
};

const onLoginPressed = async ({navigation, username, password, setState, setError}) => 
{
    // Update the error msg
    setState(STATE.FETCHING) ;
    setError("Waiting for server response ...") ;

    // Call the core request
    var result = await login(username, password)
    
    if (!result.success)
    {
        // If invalid response
        if (!result.error)
        {
            setState(STATE.FAILED)
            setError("Internal error ...") 
            return
        }

        // If valid failure response
        setState(STATE.FAILED)
        setError(result.error) 
        return
    }

    // TODO : If success
    setState(STATE.READY)
    setError("")
    navigation.navigate('Accounts', {})
}

function displayOptions (navigation) {
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: ["Cancel",`Change server address`],
            cancelButtonIndex: 0,
            userInterfaceStyle: 'dark'
        },
        buttonIndex => {
            if(buttonIndex === 1) {
                changeServerAddress()
            }
        }
    )
}

function changeServerAddress () {
    var current = getServerAddress()
    // Get the current server address
    Alert.prompt(
        'Change server host',   // Title
        null,                   // Message
        setServerAddress,       // Action
        'plain-text',           // Alert type
        current,                // Default value
        'default'               // Keyboard type
    )
}

// Page style
const login_style = StyleSheet.create({
    container: {
        marginTop: 50
    },  
    label: {
        textAlign: "center"
    },
    input: {
        margin: 5,
        marginBottom: 20,
        padding: 10,
        marginHorizontal: 30,
        borderRadius: 5,
        backgroundColor: "white"
    }, 
    info: {
        textAlign: "center",
        color: "grey",
        margin: 5
    },
    error: {
        color: "red"
    }
})

const STATE = {
    READY: 0, 
    FETCHING: 1, 
    FAILED: 2
}