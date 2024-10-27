export const getCurrentUser = async () => {
    // Retrieve the values from localStorage, but only parse if they exist
    const userToken = localStorage.getItem("GameVault Token");
    const userID = localStorage.getItem("GameVault User ID");

    // Parse only if there is data in localStorage
    const parsedUserToken = userToken ? JSON.parse(userToken) : null;
    const parsedUserID = userID ? JSON.parse(userID) : null;

    if (!parsedUserToken || !parsedUserID) {
        console.log(`No User logged in`);
        return {
            valid: false,
            message: `No ID or Token found`
        };
    } else {
        console.log(`User Logged in with ID: ${parsedUserID} and token: ${parsedUserToken}`);
        return {
            valid: true,
            ID: parsedUserID,
            Token: parsedUserToken
        };
    }
};
