import { extractStoredSession } from "../session/session";

/**
 * Send a request to the server to create a new account
 * @param {ClearAccount} account : The fields of the account to create 
 * @returns {
 *              {boolean} success
 *              {String?} error
 *          }
 */
export const createAccount = async (account) => {

    // Get the session parameters
    var session_result = extractStoredSession() ;
    if (!session_result.success) return { success: false, clearAccount: null }

    await delay(2000) ;

    return Promise.resolve({
        success: true,
        error: null
    })
}

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    })
}