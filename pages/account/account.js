import { NavigationHelpersContext } from "@react-navigation/native"
import { useEffect, useLayoutEffect, useState } from "react"
import { ActionSheetIOS, ActivityIndicator, Alert, Button, Clipboard, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, Vibration, View } from "react-native"
import { Header } from "react-native/Libraries/NewAppScreen"

import { APP_MAIN_COLOR, CenteredActivityIndicator, DEFAULT_FONT_SIZE, Style, TITLE_FONT_SIZE } from '../../assets/style/Style'
import { deleteAccount } from "../../domain/pipelines/DeleteAccount"
import { getClearAccount } from "../../domain/pipelines/GetClearAccountFromId"
import { Parent } from "../password"

export const AccountScreen = ({navigation, route}) => {

    const accountId = route.params.accountId

    const [isLoading, setLoading] = useState(true)
    const [account, setAccount] = useState({})

    const update = () => {
        setLoading(true)
        getClearAccount(navigation, accountId).then(result => {
            setAccount(result.clearAccount)
            setLoading(false)
        })
    }

    useEffect(() => {
        const unsuscribe = navigation.addListener('focus', () => {
            // This will be executed when the page goes from background to foreground
            update()
        }) ;
        update()
        return unsuscribe
    }, [navigation])

    function displayOptions (label, value, field) {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ["Cancel",`Edit ${label.toLowerCase()}`, `Copy ${label.toLowerCase()}`],
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark',
                tintColor: APP_MAIN_COLOR
            },
            buttonIndex => {
                if(buttonIndex === 1) {
                    updateValue(field)
                }
                else if (buttonIndex === 2) {
                    Clipboard.setString(value)
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

    const onDeletePressed = () => {
        Alert.prompt(
            "Etes vous sûr de vouloir supprimer ce compte ?",
            "Cette opération ne pourra pas être annulée",
            () => {
                setLoading(true)
                deleteAccount(navigation, account.id).then(result => {
                    setLoading(false)
                    navigation.navigate("Accounts", {})
                })
            },
            'default',
            null,
            'default'
        )
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
                                onPress={onDeletePressed}
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
    if (text == null) return null
    return text.length > MAX_LENGTH ?
        text.substring(0, MAX_LENGTH - 4) + " ..." :
        text
}

const style = StyleSheet.create({
    content: {
        marginTop: 20
    }, 
    field: {
        marginVertical: 10,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8
    },
    label: {
        marginBottom: 5,
        color: APP_MAIN_COLOR
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

export const EDIT_FIELD = {
    NAME: 0,
    LINK: 1,
    USERNAME: 2,
    PASSWORD: 3
}