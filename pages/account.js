import React, { useEffect, useState } from 'react';
import {  View,  StyleSheet, Text, ActivityIndicator, Button, Alert } from 'react-native';
import { disconnectUser } from '../domain/pipelines/DisconnectUser';
import { getClearAccountFromId, onCoreError } from '../domain/pipelines/GetClearAccountFromId';
import { editAccount } from '../domain/pipelines/EditAccount';
import { State } from './accounts';
import { SafeAreaView } from 'react-native-safe-area-context';


export const AccountScreen = ({ navigation, route }) => {

    // Get the params from the screen request
    var accountId = route.params.accountId

    const [clearAccount, setClearAccount] = useState(null) ;
    const [state, setState] = useState(State.LOADING) ;

    // Get the account info from the account id and update the page
    const fetchAccount = () => {
        getClearAccountFromId(accountId).then(result => {

            // If failed to load account then disconnect user
            if (!result.success)
            {
                setState(State.FAILURE)
                disconnectUser(navigation)
                return
            }

            // If account loaded then display it
            setClearAccount(result.clearAccount)
            // Change the name of the page
            navigation.setOptions({ title: result.clearAccount.name })
            // Update the state of the page
            setState(State.SUCCESS)
        })
    }

    // Fetch the account at the page start
    useEffect(fetchAccount, [])

    /**
     * An editable is a line of the account: it is composed of a label, a content, a copy button and a an edit button, which will call
     * the edit request for the account
     * 
     * onEdit can be null, if non null it will override the default action on edit button pressed 
     * (default action is editing the field of the account) with editAccont function
     */
    const Editable = ({label, content, clearAccount, contentSetter, onEdit }) => {

        // When new value is validated by user
        const onPress = text => {
            // Update the concerned field
            contentSetter(text) ;
            // Send the request to the server
            editAccount(clearAccount).then(result => {
                if (!result.success) {
                    disconnectUser(navigation) ;
                    return
                }
                // Update the current page with the result
                navigation.navigate("Account", {clearAccount: result.clearAccount})
            })
        }

        return (
            <View style={account_style.account_field}>
                <View style={account_style.label_content_container}>
                    <Text style={account_style.label}>{label} : </Text>
                    <Text style={account_style.content}>{limitText(content)}</Text>
                </View>
                <Button
                    title="Edit"
                    onPress={
                        onEdit != null ? onEdit :
                        () => {
                        Alert.prompt(
                            `Edit ${label}`,        // Title
                            null,                   // Message
                            onPress, // Action
                            'plain-text',           // Alert type
                            content,                // Default value
                            'default'               // Keyboard type
                        )
                    }}
                />
                <Button
                    title="Copy"
                />
            </View>
        )
    }

    const Account = ({clearAccount}) => {
        return (
            <View style={account_style.account_container}>
                <Editable
                    label="Name"
                    clearAccount={clearAccount}
                    content={clearAccount.name}
                    contentSetter={(value) => clearAccount.name = value}
                />
                <Editable
                    label="Link"
                    clearAccount={clearAccount}
                    content={clearAccount.link}
                    contentSetter={(value) => clearAccount.link = value}
                />
                <Editable
                    label="Username"
                    clearAccount={clearAccount}
                    content={clearAccount.username}
                    contentSetter={(value) => clearAccount.username = value}
                />
                <Editable
                    label="Password"
                    clearAccount={clearAccount}
                    content={clearAccount.clearPassword}
                    contentSetter={null}
                    onEdit={() => {
                        // TODO : go to password page
                        navigation.navigate("Password", {password: clearAccount.clearPassword})
                    }}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={account_style.container}>
            {/* Display the loading indicator while loading then the account if loaded */}
            {state == State.LOADING ?
                <ActivityIndicator/> 
            :state == State.SUCCESS ?
                <Account clearAccount={clearAccount} /> 
            :
                <View></View>
            }
        </SafeAreaView>
    )

};

// Shorten a text if it is too long, by returning the beginning only, with ... at the end
function limitText (text) {
    const MAX_LENGTH = 28
    return text.length > MAX_LENGTH ?
        text.substring(0, MAX_LENGTH - 4) + " ..." :
        text
}

const account_style = StyleSheet.create({
    container: {
    },
    account_container: {
        alignSelf: "center",
        width: '80%'
    },
    label: {
        fontWeight: "bold",
        marginBottom: 3
    },
    content: {},
    label_content_container: {
        flex: 1
    },
    account_field: {
        flexDirection: "row",
        alignItems: "center",
        margin: 8,
        justifyContent: "space-between"
    }
});