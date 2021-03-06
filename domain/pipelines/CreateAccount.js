import { sendPostRequest } from "../core_communication/fetchAgent";
import { extractStoredSession } from "../session/session";
import { disconnectUser } from "./DisconnectUser";

/**
 * Send a request to the server to create a new account
 * @param {ClearAccount} account : The fields of the account to create 
 * @returns {
 *              {boolean} success
 *              {String?} error
 *          }
 */
export const createAccount = async (navigation, account) => {

    // Get the session parameters
    var session_result = extractStoredSession() ;
    if (!session_result.success) return { success: false, clearAccount: null }

    const username = session_result.username
    const password = session_result.password

    try {
        // Send a post request to the server with username and password as arguments
        const response = await sendPostRequest("create", 
            {
                userUsername: username, 
                userClearPassword: password,
                name: account.name,
                link: account.link,
                username: account.username,
                clearPassword: account.clearPassword
            }
        )

        // Return the result
        return response
    }

    // In case of failure reaching the server
    catch (exception) {
        disconnectUser(navigation)
    }
}