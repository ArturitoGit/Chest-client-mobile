import { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"
import { DismissKeyBoard, Style } from "../../assets/style/Style";
import { FieldPage } from "./OneFieldPage";

import { Parent } from "../password";
import { AccountNameValidator } from "../account/account";


export const CreateScreen = ({ navigation, route }) => {

    // Get the params
    var params = route.params ;
    var part = params.part ;
    var account = params.account != null ? params.account : EMPTY_ACCOUNT ;

    // Initialize values from retrieved account 
    const [name, setName] = useState(account.name)
    const [username, setUsername] = useState(account.username)
    const [link, setLink] = useState(account.link)

    // Get the account object from all of the page variables
    const getCurrentAccount = () => {return { name: name, link: link, username: username, password:"" }}

    // Get the current page from the PART variable, which is part of the navigate request
    const getPage = () => {
        switch (part) {
            case Create_Parts.NAME :
                return (
                    <FieldPage
                        label="Quel sera le nom de votre nouveau compte ?"
                        value={name}
                        setValue={setName}
                        placeholder="Mon super compte"
                        // On Name validate show a new page with username input info
                        onValidate = {() => navigation.push("Create", {part: Create_Parts.LINK, account: getCurrentAccount() })}
                        validator={AccountNameValidator}
                    />
                )
            case Create_Parts.LINK:
                return (
                    <FieldPage
                        label="Collez ici le lien qui donne accès à votre compte"
                        value={link}
                        setValue={setLink}
                        placeholder="https://my-great-account.com"
                        onValidate = {() => navigation.push("Create", {part: Create_Parts.USERNAME, account: getCurrentAccount() })}
                        onIgnore = {() => navigation.push("Create", {part: Create_Parts.USERNAME, account: account })}
                        multiline={true}
                    />
                )
            case Create_Parts.USERNAME :
                return (
                    <FieldPage
                        label="Quel sera votre identifiant pour ce compte ?"
                        value={username}
                        setValue={setUsername}
                        placeholder="L'identifiant de mon super compte"
                        // On username validated show the generate password page
                        onValidate = {() => navigation.push("Password", {account: getCurrentAccount(), parent: Parent.CREATE })}
                    />
                )
        }
    }

    // Return the page
    return (
        <DismissKeyBoard>
            <SafeAreaView style={Style.container}>
                {getPage()}
            </SafeAreaView>
        </DismissKeyBoard>
    )
}

// The default account is used as the model for a new account
const EMPTY_ACCOUNT = {
    username: "",
    link: "",
    username: "",
    password: ""
}

// The different parts of the same page
export const Create_Parts = {
    NAME: 0,
    USERNAME: 1,
    PASSWORD: 2,
    LINK: 3
}