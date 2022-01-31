import { extractStoredSession } from "../session/session"
import { getPreviousUsername } from "../data/username"

export const getAccounts = async () => {

    // Extract the username and password from the session
    var getSessionResult = extractStoredSession() ; 
    if (!getSessionResult.success) return Promise.resolve({success: false, accounts: null})

    // Wait 2s
    await delay(2000)

    // return []

    // return Promise.resolve({
    //     success: true,
    //     accounts: []
    // })

    return Promise.resolve({
        success: true,
        accounts: 
        [
            {
                id: 0,
                name: "La banque postale"
            },
            {
                id: 1,
                name: "Expo"
            },
            {
                id: 2,
                name: "Github"
            },
            {
                id: 3,
                name: "Le père Noël"
            },
        ]
    })
        
}

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    })
}
