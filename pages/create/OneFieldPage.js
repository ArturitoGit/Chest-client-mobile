import { useEffect, useState } from "react"
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from "react-native"
import { APP_MAIN_COLOR, CenteredActivityIndicator, Style } from "../../assets/style/Style"

/**
 * This page shows a simple input text page, which contains :
 * 
 * - A label, to explain what to enter in the page
 * - A value, to fill the input and a setValue to update the value with the input
 * - An optional placeholder for the input text
 * - A callback for the validation
 * - An optional callback for a cancellation of the page
 */
export const FieldPage = ({ 
        label, 
        value, 
        setValue, 
        placeholder="", 
        onValidate,
        isLoading, 
        onIgnore, 
        multiline = false,
        validator = content => ({success: true, error: ""})
        }) => {

    const tryValidate = async () => {
        const isValueValid = validator(value)
        if (isValueValid.success) {
            await onValidate()
            return
        }
        setError(isValueValid.error)
    }

    const [error, setError] = useState("")

    return (
        <View style={create_style.field}>
            <Text style={create_style.question}>{label}</Text>
            <TextInput
                style={[Style.input, create_style.input]}
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                autoFocus={true}
                returnKeyType='next'
                onSubmitEditing={tryValidate}
                multiline={multiline}
                selectionColor={APP_MAIN_COLOR}
                // Do not help the user write his informations
                autoComplete='off'
                autoCapitalize='none'
                autoCorrect={false}
            />
            <Text style={create_style.error}>{error}</Text>
            <View style={{
                flexDirection: "row", 
                justifyContent: onIgnore == null ? "center" : "space-around"}}>
                {
                    onIgnore != null ? (
                        <Button
                            title="Ignorer"
                            onPress={onIgnore}
                            color={APP_MAIN_COLOR}
                        />
                    ) : []
                }
                <Button 
                    title="Valider"
                    onPress={tryValidate}
                    color={APP_MAIN_COLOR}
                />
            </View>
            {isLoading ? <ActivityIndicator/> : []}
        </View>
    )
}

const create_style = StyleSheet.create({
    field: {

    },
    question: {
        fontSize: 25,
        fontWeight: "bold",
        marginVertical: 20,
        color: APP_MAIN_COLOR
    },
    input: {
        marginVertical: 10
    },
    error: {
        textAlign: "center",
        color: "red"
    }
})