import { sendPostRequest } from "../core_communication/fetchAgent";
import { extractStoredSession } from "../session/session"
import { disconnectUser } from "./DisconnectUser";

/**
 * 
 * @param {int} accountId 
 * @returns {
 *              {boolean}       success         : true if the request returned a clear account, false otherwise
 *              {ClearAccount?} clearAccount    : the clear account if success is true, null if success is false
 *          }
 */
export const getClearAccount = async (navigation, accountId) => {


    // Extract the username and password from the session
    var getSessionResult = extractStoredSession() ; 
    if (!getSessionResult.success) return Promise.resolve({success: false, clearAccount: null})

    const username = getSessionResult.username
    const password = getSessionResult.password

    try {

        // Send a post request to the server with username and password as arguments
        const response = await sendPostRequest("decrypt", 
            {
                userUsername: username, 
                userClearPassword: password,
                accountId: accountId
            }
        )

        if (!response.success) return {
            success: false, clearAccount: null
        }

        var clearAccount = {...response.account}
        clearAccount.clearPassword = response.clearPassword

        return {
            success: true,
            clearAccount: clearAccount
        }
    }

    // In case of failure reaching the server
    catch (exception) {
        disconnectUser(navigation)
    }

}