import { extractStoredSession } from "../session/session";

/**
 * Send a request to the server to generate a password, with the parameters of the API
 * and return a randomly generated password, or a failure
 * 
 * @param {*} param0 
 * @returns {
 *              {boolean} success
 *              {string?} password : the generated password if success, false otherwise
 *              {string?} error : The error from the server if the parameters weren't valid
 *          }
 */
export const generatePassword = async ({navigation, length, upper, lower, numbers, symbols, forced}) => {

    // Extract the username and password from the session
    var getSessionResult = extractStoredSession() ; 
    if (!getSessionResult.success) return Promise.resolve({success: false, clearAccount: null})

    await delay(1000) ;

    // If unable to join server then disconnect the user
    // TODO

    return Promise.resolve({
        success: true,
        password: "j0272RIHJFh"
    })

}

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    })
}