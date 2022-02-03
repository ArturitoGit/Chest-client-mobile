import { extractStoredSession } from "../session/session"
import { getPreviousUsername } from "../data/username"
import { sendPostRequest } from "../core_communication/fetchAgent";

export const getAccounts = async () => {

    // Extract the username and password from the session
    var getSessionResult = extractStoredSession() ; 
    if (!getSessionResult.success) return Promise.resolve({success: false, accounts: null})

    const username = getSessionResult.username
    const password = getSessionResult.password

    try {

        // Send a post request to the server with username and password as arguments
        const response = await sendPostRequest("get", 
            {
                username: username, 
                password: password
            }
        )

        // Return the result
        return response
    }

    // In case of failure reaching the server
    catch (exception) {
        console.log(exception)
        return {
            success: false,
            error: "Failed to reach the server"
        }
    }
        
}