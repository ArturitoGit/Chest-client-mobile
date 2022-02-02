import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { Style } from "../../assets/style/Style"

/**
 * This page shows a simple input text page, which contains :
 * 
 * - A label, to explain what to enter in the page
 * - A value, to fill the input and a setValue to update the value with the input
 * - An optional placeholder for the input text
 * - A callback for the validation
 * - An optional callback for a cancellation of the page
 */
export const FieldPage = ({ label, value, setValue, placeholder="", onValidate, onIgnore }) => {
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
                onSubmitEditing={onValidate}
            />
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
                    onPress={onValidate}
                />
            </View>

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
    }
})