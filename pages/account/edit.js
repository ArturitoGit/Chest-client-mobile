import { useState } from "react"
import { SafeAreaView } from "react-native"
import { DismissKeyBoard, Style } from "../../assets/style/Style"
import { FieldPage } from "../create/OneFieldPage"

import { editAccount } from '../../domain/pipelines/EditAccount'
import { AccountNameValidator } from "./account"

import { EDIT_FIELD } from './account' 

export const EditScreen = ({navigation, route}) => {

    // Get the navigation params
    const field = route.params.field
    const initial_account = route.params.account

    const [name, setName] = useState(initial_account.name)
    const [link, setLink] = useState(initial_account.link)
    const [username, setUsername] = useState(initial_account.username)

    const[isLoading, setLoading] = useState(false)

    const submit = async () => {
        setLoading(true)
        const newAccount = {
            id: initial_account.id,
            name: name,
            link: link,
            username: username,
            clearPassword: initial_account.clearPassword
        }
        await editAccount(navigation, newAccount)
        setLoading(false)
        navigation.navigate("Account", {accountId: initial_account.id})
    }

    return (
        <DismissKeyBoard>
            <SafeAreaView style={Style.container}>
                {
                    field == EDIT_FIELD.NAME ?
                        (<FieldPage
                            label="Quel nom voulez-vous donner à ce compte ?"
                            placeholder="Le nom de mon compte"
                            value={name}
                            setValue={setName}
                            onValidate={submit}
                            validator={AccountNameValidator}
                            isLoading={isLoading}
                        />) :
                    field == EDIT_FIELD.LINK ?
                        (<FieldPage  
                            label="Collez ici le lien de votre compte"
                            placeholder="https://..."
                            value={link}
                            setValue={setLink}
                            onValidate={submit}
                            multiline={true}
                            isLoading={isLoading}
                        />) :
                    field == EDIT_FIELD.USERNAME ?
                        (<FieldPage  
                            label="Quel est votre identifiant pour ce compte ?"
                            placeholder="Mon identifiant"
                            value={username}
                            setValue={setUsername}
                            onValidate={submit}
                            isLoading={isLoading}
                        />) :
                    []

                }
            </SafeAreaView>
        </DismissKeyBoard>
    )
}