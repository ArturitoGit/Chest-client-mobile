
export const login = async (username, password) => {

    // Wait 4s
    await delay(2000) ;

    // Return result
    return {
        success: false,
        error: `Fail for ${username}, ${password}`
    }
}

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}