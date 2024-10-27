import axios from 'axios';
import { authHeader } from '../services/auth-header';

export const signIn = async (newUser, password) => {
    

    try {
        const response = await axios.post("http://localhost:3000/auth/signin",
            {
                newUser,
                password
            },
            authHeader()
        );
        const token = JSON.stringify(response.data.token)
        const userID = JSON.stringify(response.data.user_id)
    
       localStorage.setItem("GameVault Token",token)
       localStorage.setItem("GameVault User ID", userID)
        const tokenFromLocal = localStorage.getItem("GameVault Token")
        if(!tokenFromLocal){
            return {
                valid:false,
                message:`No data saved to local storage`
            }
        }
        return {
            valid: true,
            message: `User with id ${tokenFromLocal} signed in`
        };
    } catch (error) {
        // Handle Axios Errors
        if (axios.isAxiosError(error)) {
            return {
                valid: false,
                message: `Error Signing in user or incorrect credentials`,
                AxiosError: `${ error } `
            };
        } else {
            // Handle general errors
            return {
                valid: false,
                message: `Unexpected error ${ error } `
            };
        }
    }
};
