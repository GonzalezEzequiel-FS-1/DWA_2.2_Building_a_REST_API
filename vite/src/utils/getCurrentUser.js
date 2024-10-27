export const getCurrentUser = async () => {
    // Retrieve the values from localStorage, but only parse if they exist
    const userToken =localStorage.getItem("GameVault Token");
    const userID = localStorage.getItem("GameVault User ID");
    
    if (!userToken || !userID) {
        return {
            valid: false,
            message: `User Not logged in`
        };
    } else {
        return {
            valid: true,
            ID: userID,
            Token: userToken
        };
    }
};
