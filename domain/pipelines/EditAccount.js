import { extractStoredSession } from "../session/session"

/**
 * Send a request to the server to update one of the accounts
 * @param {ClearAccount} clearAccount : An account object that contains the id of the item to update, and the new attributes of the item
 * 
 * @returns {
 *              {boolean} success
 *              {ClearAccount} clearAccount : the updated account if success, null otherwise
 *          } 
 */
export const editAccount = async (clearAccount) => {

    // Get the session parameters
    var session_result = extractStoredSession() ;
    if (!session_result.success) return { success: false, clearAccount: null }

    await delay(1000)

    // Return success
    return Promise.resolve({
        success: true,
        clearAccount: clearAccount
    })

}

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    })
}