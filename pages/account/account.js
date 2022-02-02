import { NavigationHelpersContext } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { ActionSheetIOS, ActivityIndicator, Alert, Button, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, Vibration, View } from "react-native"
import { Header } from "react-native/Libraries/NewAppScreen"

import { CenteredActivityIndicator, DEFAULT_FONT_SIZE, Style, TITLE_FONT_SIZE } from '../../assets/style/Style'
import { getClearAccountFromId } from "../../domain/pipelines/GetClearAccountFromId"
import { Parent } from "../password"
import { EDIT_FIELD } from "./edit"

export const AccountScreen = ({navigation, route}) => {

    const accountId = route.params.accountId

    const [isLoading, setLoading] = useState(true)
    const [account, setAccount] = useState({})

    useEffect(() => {
        // Get the clear account from the server
        getClearAccountFromId(accountId).then(result => {
            // Update the variable and display it
            setAccount(result.clearAccount)
            setLoading(false)
        })
    }, [])

    function displayOptions (label, value, field) {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ["Cancel",`Edit ${label.toLowerCase()}`, `Copy ${label.toLowerCase()}`],
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark'
            },
            buttonIndex => {
                if(buttonIndex === 1) {
                    updateValue(field)
                }
            }
        )
    }
    
    function updateValue (field) {
        // If update password
        if (field == EDIT_FIELD.PASSWORD) {
            navigation.push("Password", {account: account, parent: Parent.EDIT})
            return
        }
        // Else call the edit page
        navigation.push("Account_Edit", {account: account, field: field})
    }

    const Field = ({label, value, field}) => (

        <TouchableOpacity
            onPress={() => displayOptions(label, value, field)}
        >
            <View style={style.field}>
                <Text style={[Style.label, style.label]}>{label}</Text>
                <Text style={style.value}>{limitText(value)}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={[Style.container]}>
            {
                isLoading ? <CenteredActivityIndicator/> :
                (
                    <View style={style.content}>
                        <Field
                            label="Name"
                            value={account.name}
                            field={EDIT_FIELD.NAME}
                        />
                        <Field
                            label="Link"
                            value={account.link}
                            field={EDIT_FIELD.LINK}
                        />
                        <Field
                            label="Username"
                            value={account.username}
                            field={EDIT_FIELD.USERNAME}
                        />
                        <Field
                            label="Password"
                            value={account.clearPassword}
                            field={EDIT_FIELD.PASSWORD}
                        />
                        <View style={style.deleteButton}>
                            <Button
                                title="Delete"
                                color="red"
                            />
                        </View>
                    </View>
                )
            }
        </SafeAreaView>
    )

}

export const AccountNameValidator = (name) => {
    if (name == null || name.length <= 0) return {
        success: false, error: "Account name must not be empty"
    }
    return {
        success: true
    }
}

// Shorten a text if it is too long, by returning the beginning only, with ... at the end
function limitText (text) {
    const MAX_LENGTH = 50
    return text.length > MAX_LENGTH ?
        text.substring(0, MAX_LENGTH - 4) + " ..." :
        text
}

const style = StyleSheet.create({
    content: {
    }, 
    field: {
        marginVertical: 10,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8
    },
    label: {
        marginBottom: 5,
    },
    value: {
        marginLeft: 20,
        fontSize: DEFAULT_FONT_SIZE,
        color: "gray"
    },
    deleteButton: {
        marginTop: 20
    },
})