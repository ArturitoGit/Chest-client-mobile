import { extractStoredSession } from "../session/session"

/**
 * 
 * @param {int} accountId 
 * @returns {
 *              {boolean}       success         : true if the request returned a clear account, false otherwise
 *              {ClearAccount?} clearAccount    : the clear account if success is true, null if success is false
 *          }
 */
export const getClearAccountFromId = async accountId => {

    // Extract the username and password from the session
    var getSessionResult = extractStoredSession() ; 
    if (!getSessionResult.success) return Promise.resolve({success: false, clearAccount: null})

    await delay(1000)

    if (accountId != 1) return Promise.resolve({
        success: false, clearAccount: null
    })

    return Promise.resolve({
        success: true,
        clearAccount: {
            id: 1, 
            name: "La banque postale",
            link: "http://la-banque-postale.comoushdfoldshdpihzsdlmikhfdslmhdspm",
            username: "arturito",
            clearPassword: "el_burrito15"
        }
    })
}
function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    })
}