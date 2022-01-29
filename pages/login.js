// React native imports
import React, { useState, useRef } from "react";
import { Text, View, TextInput, StyleSheet, Button } from 'react-native' ;

// Internal functions
import { login } from "../communication/core/core-requests" ;
import { getPreviousUsername } from "../data/username";

// Page content
export const LoginScreen = ({ navigation }) => {

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
        username: username,
        password: password,
        setState: setState, 
        setError: setInfo
    })


    return (
        <View style={login_style.container}>
            
            {/* Username field */}
            <Text style={login_style.label}>Username : </Text>
            <TextInput 
                autoCapitalize = {"none"}
                style={login_style.input}
                onChangeText={onUsernameChange}
                value={username}
                onSubmitEditing={() => { passwordInputField.current.focus(); }}
            />

            {/* Password field */}
            <Text style={login_style.label}>Password : </Text>
            <TextInput 
                ref={passwordInputField}
                style={login_style.input} 
                secureTextEntry={true}
                onChangeText={onPasswordChange}
                value={password}
                onSubmitEditing={submit}
            />

            {/* Info field */}
            <Text 
                style={
                    // Style of the info field depending of the state of the screen
                    state == STATE.FETCHING ? login_style.info :
                    state == STATE.FAILED ? [login_style.info, login_style.error] :
                    []
                }
            >
                {info}
            </Text>

            {/* Login button */}
            <Button
                onPress={submit}
                title="Login"
            />
        </View>
    ) ;
};

const onLoginPressed = async ({username, password, setState, setError}) => 
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
    }

    // TODO : If success
}

// Page style
const login_style = StyleSheet.create({
    container: {
        marginTop: 50
    },  
    label: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15
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