import React, { useEffect, useState } from 'react' ;
import { Text, TextInput, Button, View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native' ;

import { getAccounts } from "../domain/pipelines/GetAccounts" ;

// Page main function
export const AccountsScreen = ({ navigation }) => {

    // Page variables
    const [accounts, setAccounts] = useState([]) ;
    const [displayedAccounts, setDisplayedAccounts] = useState([]) ;
    const [state, setState] = useState(State.LOADING) ;

    // Get the accounts from the core and populate the page
    const fetchAccounts = () => {
        setState(State.LOADING)
        getAccounts()
            .then(result => {
                setState(result.success ? State.SUCCESS : State.FAILURE)
                setAccounts(result.accounts) ;
                setDisplayedAccounts(result.accounts) ;
            })
    }

    // On one account clicked
    const onAccountClicked = account => {
        navigation.navigate("Account", {accountId: account.id})
    }

    // Filter the displayed accounts with the search bar
    const filterAccounts = search => {
        var search_lc = search.toLowerCase() ;
        var result = [] ;
        accounts.forEach(ac => {
            var matches = (ac.name.toLowerCase().includes(search_lc)) ;
            if (matches) result.push(ac)
        }) ;
        setDisplayedAccounts(result) ;
    }

    // At the beginning fetch the accounts then populate the 
    // accounts variable
    useEffect(fetchAccounts, [])

    // Aspect of one account in the list
    const renderAccount = ({ item }) => (
        <TouchableOpacity onPress={() => onAccountClicked(item)}>
            <View style={accounts_style.account}>
                <Text style={accounts_style.account}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    // Render the list of all accounts
    const Accounts = ({accounts, onAccountClicked}) => {
        return (
        (!accounts.length || accounts.length <= 0) ?
            <Text style={accounts_style.no_account_found}>
                No account was found ...
            </Text> 
            :
            <FlatList
                style={accounts_style.accounts}
                data={accounts}
                renderItem={renderAccount}
                keyExtractor={(item) => item.id}
                extraData={onAccountClicked}
            />)
    }
    
    return (
        <View style={accounts_style.container}>
            <TextInput 
                style={accounts_style.search_input}
                placeholder={"Search account ..."}
                returnKeyType={"search"}
                clearButtonMode={"always"}
                onChangeText={content => filterAccounts(content)}
            />
            <View>
            {
                // If failed to load then display error message
                (state == State.FAILURE) ?
                    <View>
                        <Text style={accounts_style.no_account_found}>
                            Error loading accounts
                        </Text>
                        <Button
                            title={"Retry"}
                            color={"grey"}
                            onPress={fetchAccounts}
                        />
                    </View> 
                :
                // If still loading then display activity indicator
                (state == State.LOADING) ? 
                <ActivityIndicator/> 
                : 
                // If loaded yet display the list of accounts
                <Accounts 
                    accounts={displayedAccounts} 
                    onAccountClicked={onAccountClicked}
                />
            }
            </View>
        </View>
    );
};

// Style of the page
const accounts_style = StyleSheet.create({
    container: {
        justifyContent: "center",    
    },
    accounts: {
        // This way accounts will be aligned to the left
        // with a 20% margin at the left
        alignSelf: "center",
        width: "60%"
    },
    account: {
        marginVertical: 5,
        fontSize: 18,
        fontWeight: "bold"
    },
    search_input: {
        backgroundColor: "white",
        borderRadius: 5,
        padding: 5,
        borderRadius: 5,
        marginVertical: 20,
        marginHorizontal: 30,
        fontSize: 18,
    },
    no_account_found: {
        marginTop: 10,
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
    }
})

// States of the page
export const State = {
    LOADING: 0,
    SUCCESS: 1,
    FAILURE: 2
}