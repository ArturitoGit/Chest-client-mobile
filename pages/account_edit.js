import { StyleSheet, Text, TextInput, View } from 'react-native' ;


export const accountEditScreen = ({navigation, route}) => {

    // Get the account infos from the route params
    var clearAccount = route.params.clearAccount ;

    console.log(JSON.stringify(clearAccount))

    return (
        <View style={account_edit_style.container}>
            <Text style={account_edit_style.label}>Name :</Text>
            <TextInput style={account_edit_style.input}
                placeholder='Enter a name'
                value={clearAccount.name}
            />
            <Text style={account_edit_style.label}>Link :</Text>
            <TextInput style={account_edit_style.input}
                placeholder='Enter a link'
                value={clearAccount.link}
            />
            <Text style={account_edit_style.label}>Username :</Text>
            <TextInput style={account_edit_style.input}
                placeholder='Enter a username'
                value={clearAccount.username}
            />
            <Text style={account_edit_style.label}>Password :</Text>
            <TextInput style={account_edit_style.input}
                placeholder='Enter a password'
                value={clearAccount.clearPassword}
            />
        </View>
    )
}

const account_edit_style = StyleSheet.create({
    container: {
        marginTop: 30 
    },  
    label: {
        marginBottom: 10,
        marginTop: 20,
        textAlign: "center",
        fontWeight: "bold"
    },
    input: {
        marginHorizontal: 20,
        padding: 5,
        borderRadius: 5,
        backgroundColor: "white"
    }
})