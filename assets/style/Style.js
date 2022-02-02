
import { ActivityIndicator, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

// Static style constants
export const DEFAULT_FONT_SIZE = 15
export const LABEL_FONT_SIZE = 20
export const TITLE_FONT_SIZE = 35

export const Style = StyleSheet.create({
    container: {
        margin: 30,
        height: '100%',
    },
    label: {
        fontWeight: "bold",
        fontSize: LABEL_FONT_SIZE
    },
    input: {
        backgroundColor: "white",
        padding: 8,
        borderRadius: 8,
        fontSize: DEFAULT_FONT_SIZE
    }
})

// Common components
// Tap anywhere on the screen will dismiss keyboard
export const DismissKeyBoard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
)

export const CenteredActivityIndicator = () => (
    <View style={{
        height: "100%",
        flexDirection: "row",
        justifyContent: "center"
    }}>
        <ActivityIndicator/>
    </View>
)