import React, { useCallback, useEffect, useState } from 'react' ;
import { Text, TextInput, Button, View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, SafeAreaView, RefreshControl } from 'react-native' ;
import { APP_MAIN_COLOR, CenteredActivityIndicator, Style } from '../assets/style/Style';

import { getAccounts } from "../domain/pipelines/GetAccounts" ;
import { Create_Parts } from './create/create';

// Page main function
export const AccountsScreen = ({ navigation }) => {

    // Page variables
    const [accounts, setAccounts] = useState([]) ;
    const [displayedAccounts, setDisplayedAccounts] = useState([]) ;
    const [state, setState] = useState(State.LOADING) ;
    const [ refreshing, setRefreshing ] = useState(false) ;

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAccounts().then(result => {
            setAccounts(result.accounts)
            setDisplayedAccounts(result.accounts)
            setRefreshing(false)
        })
    }, [])

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

    const createAccount = () => navigation.navigate("Create", { part: Create_Parts.NAME})

    // Add right button to the header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={createAccount} color={APP_MAIN_COLOR} title="New"/>
            )
        })
    }, [navigation])

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


    useEffect(() => {
        const unsuscribe = navigation.addListener('focus', () => {
            // This will be executed when the page goes from background to foreground
            fetchAccounts()
        }) ;
        fetchAccounts()
        return unsuscribe
    }, [navigation])

    // Aspect of one account in the list
    const renderAccount = ({ item }) => (
        <TouchableOpacity onPress={() => onAccountClicked(item)}>
            <View style={[accounts_style.account]}>
                <Text style={[accounts_style.account_name]}>{item.name}</Text>
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
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />)
    }
    
    return (
        <SafeAreaView style={[Style.container, accounts_style.container]}>
            <TextInput 
                style={[Style.input, accounts_style.search_input]}
                placeholder={"Search account ..."}
                returnKeyType={"search"}
                clearButtonMode={"always"}
                onChangeText={content => filterAccounts(content)}
            />
            <View style={[{flex: 1}, accounts_style.accounts_container]}>
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
                <CenteredActivityIndicator/> 
                : 
                // If loaded yet display the list of accounts
                <Accounts 
                    accounts={displayedAccounts} 
                    onAccountClicked={onAccountClicked}
                />
            }
            </View>
        </SafeAreaView>
    );
};

// Style of the page
const accounts_style = StyleSheet.create({
    container: {
        height: "100%"
    },
    accounts_container: {
        borderRadius: 15,
        backgroundColor: "white",
        // This way accounts will be aligned to the left
        paddingVertical: 10,
    },
    accounts: {
        paddingLeft: 30,
    },
    account: {
        marginVertical: 10,
    },
    account_name: {
        fontSize: 18,
        fontWeight: "bold",
        color: APP_MAIN_COLOR
    },
    search_input: {
        borderRadius: 5,
        marginVertical: 20,
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