import axios from 'axios';

export const signIn = async (newUser, password) => {
    const token = await localStorage.getItem("GameVault Token");
    console.log(token);

    try {
        const response = await axios.post("http://localhost:3000/auth/signin", 
            {
                newUser, 
                password
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return {
            valid: true,
            message: `User with id ${response.data.user_id} signed in`
        };
    } catch (error) {
        // Handle Axios Errors
        if (axios.isAxiosError(error)) {
            return {
                valid: false,
                message: `Error Signing in user ${error}`
            };
        } else {
            // Handle general errors
            return {
                valid: false,
                message: `Unexpected error ${error}`
            };
        }
    }
};
