import { sendPostRequest } from "../core_communication/fetchAgent";
import { extractStoredSession } from "../session/session"
import { disconnectUser } from "./DisconnectUser";

/**
 * Send a request to the server to update one of the accounts
 * @param {ClearAccount} clearAccount : An account object that contains the id of the item to update, and the new attributes of the item
 * 
 * @returns {
 *              {boolean} success
 *              {ClearAccount} clearAccount : the updated account if success, null otherwise
 *          } 
 */
export const editAccount = async (navigation, clearAccount) => {

    // Get the session parameters
    var session_result = extractStoredSession() ;
    if (!session_result.success) return { success: false, clearAccount: null }

    const username = session_result.username
    const password = session_result.password

    try {

        // Send a post request to the server with username and password as arguments
        const response = await sendPostRequest("update", 
            {
                user_username: username, 
                user_password: password,
                account_id: clearAccount.id,
                account_name: clearAccount.name,
                account_link: clearAccount.link,
                account_username: clearAccount.username,
                account_password: clearAccount.clearPassword
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