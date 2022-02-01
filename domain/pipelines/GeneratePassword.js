import { extractStoredSession } from "../session/session";

/**
 * 
 * @param {*} param0 
 * @returns {
 *              {boolean} success
 *              {string?} password : the generated password if success, false otherwise
 *          }
 */
export const generatePassword = async ({length, upper, lower, numbers, symbols, forced}) => {

    // Extract the username and password from the session
    var getSessionResult = extractStoredSession() ; 
    if (!getSessionResult.success) return Promise.resolve({success: false, clearAccount: null})

    await delay(1000) ;

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