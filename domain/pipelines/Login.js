import { storeSession } from "../session/session";

/**
 * 
 * @param {string} username : the username of the user 
 * @param {string} password : the password of the user
 * @returns {
 *              {boolean}   success:    true if logged in, false otherwise
 *              {string}    error:      contains the reason of failure if success = false
 *          }
 */
export const login = async (username, password) => {

    // Wait 4s
    await delay(2000) ;

    var result = {
        success: true,
        error: `Fail for ${username}, ${password}`
    }

    // If connexion was successful then register the user infos in the session
    if (result.success) storeSession({ username: username, password: password })

    // Return result
    return {
        success: true,
        error: `Fail for ${username}, ${password}`
    }
}

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    })
}