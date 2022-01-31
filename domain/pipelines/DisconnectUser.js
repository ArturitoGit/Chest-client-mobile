import { Alert } from 'react-native';
import { resetSession } from "../session/session";

/**
 *  Send an alert to the user warning him that he is going to be disconnected, 
 *  then send him on the login page
 * @param {Navigation} navigation 
 */
export const disconnectUser = navigation => {

    // Reset the session variable
    resetSession()

    // Display an alert to warn that the user has been disconnected
    Alert.alert(
        "You have been disconnected ...",
        null,
        [
          // When the user clicks on OK he is redirected on login page
          { text: "OK", onPress: () => navigation.navigate("Login", {}) }
        ]
      );

    // Alert.prompt(
    //   "You have been disconnected ... ",
    //   "Do you have a message ?",
    //   [
    //     // When the user clicks on OK he is redirected on login page
    //     { text: "OK", onPress: (text) => console.log(text) }
    //   ],
    //   'plain-text',
    //   "Default value",
    //   'default'    
    // )
}