
// Variable that contains the session
var Static_session = null 


export const storeSession = ({username, password}) => {
    Static_session = {
        username: username,
        password: password
    }
}

/**
 *  
 * @returns {
 *              {boolean} success : Indicates if a session was stored already
 *              {string?} username : Contains the username of the session if present, null otherwise
 *              {string?} password : Contains the password of the session if present, null otherwise
 *          }
 */
export const extractStoredSession = () => {
    return (
        Static_session == null ?
        { success: false, username: null, password: null } :
        { success: true, username: Static_session.username, password: Static_session.password } 
    )
}

export const resetSession = () => {
    Static_session = null
}