import React, { useEffect, useState } from 'react';
import {  View,  StyleSheet, Text, ActivityIndicator, Button } from 'react-native';
import { disconnectUser } from '../domain/pipelines/DisconnectUser';
import { getClearAccountFromId, onCoreError } from '../domain/pipelines/GetClearAccountFromId';
import { State } from './accounts';


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

    const Account = ({clearAccount}) => {
        return (
            <View style={account_style.account_container}>
                <Text>Name : <Text>{clearAccount.name}</Text></Text>
                <Text>Link : <Text>{clearAccount.link}</Text></Text>
                <Text>Username : <Text>{clearAccount.username}</Text></Text>
                <Text>Password : <Text>{clearAccount.clearPassword}</Text></Text>
                <Button
                    title={"Edit"}
                    onPress={() => {navigation.navigate("Account_Edit", {clearAccount: clearAccount})}}
                />
            </View>
        )
    }

    return (
        <View>
            {/* Display the loading indicator while loading then the account if loaded */}
            {state == State.LOADING ?
                <ActivityIndicator/> 
            :state == State.SUCCESS ?
                <Account clearAccount={clearAccount} /> 
            :
                <View></View>
            }
        </View>
    )

};

const account_style = StyleSheet.create({
    container: {

    },
    account_container: {
        marginTop: 50,
        alignSelf: "center"
    }
});