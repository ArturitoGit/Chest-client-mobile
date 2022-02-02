import { useState } from "react"
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from "react-native"
import { CenteredActivityIndicator, Style } from "../../assets/style/Style"

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
        onIgnore, 
        multiline = false,
        validator = content => ({success: true, error: ""})
        }) => {

    const tryValidate = () => {
        var isValueValid = validator(value)
        if (isValueValid.success) {
            setLoading(true)
            onValidate()
            return
        }
        setError(isValueValid.error)
    }

    const [error, setError] = useState("")
    const [isLoading, setLoading] = useState(false)

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
                        />
                    ) : []
                }
                <Button 
                    title="Valider"
                    onPress={tryValidate}
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
        fontWeight: "bold"
    },
    input: {
        marginVertical: 30
    },
    error: {
        textAlign: "center",
        color: "red"
    }
})