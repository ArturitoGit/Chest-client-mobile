import { sendPostRequest } from "../core_communication/fetchAgent";
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
    
    try {

        // Send a post request to the server with username and password as arguments
        const response = await sendPostRequest("login", 
            {
                username: username, 
                clearPassword: password
            }
        )

        // If the request succeeded, store the parameters in the session
        if (response.success) storeSession({username: username, password: password})

        // Return the result
        return response
    }

    // In case of failure reaching the server
    catch (exception) {
        return {
            success: false,
            error: "Failed to reach the server"
        }
    }
}