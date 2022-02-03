import { sendPostRequest } from "../core_communication/fetchAgent";
import { extractStoredSession } from "../session/session";
import { disconnectUser } from "./DisconnectUser";

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
export const generatePassword = async (navigation, length, upper, lower, numbers, symbols, forced) => {

    try {

        // Send a post request to the server with username and password as arguments
        const response = await sendPostRequest("generate", 
            {
                password_length: length,
                uppercase_letters: upper,
                lowercase_letters: lower,
                numbers: numbers,
                symbols: symbols,
                fixed_content: forced
            }
        )

        return response
    }

    // In case of failure reaching the server
    catch (exception) {
        disconnectUser(navigation)
    }
}