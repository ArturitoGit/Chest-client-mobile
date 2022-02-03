import { sendPostRequest } from "../core_communication/fetchAgent";
import { extractStoredSession } from "../session/session";


export const deleteAccount = async (navigation, accountId) => {

    // Get the session parameters
    var session_result = extractStoredSession() ;
    if (!session_result.success) return { success: false, clearAccount: null }

    const username = session_result.username
    const password = session_result.password

    try {

        // Send a post request to the server with username and password as arguments
        const response = await sendPostRequest("delete", 
            {
                username: username,
                password: password,
                accountId: accountId
            }
        )

        // Return the result
        return response
    }

    // In case of failure reaching the server
    catch (exception) {
        console.log(exception)
        disconnectUser(navigation)
    }
}