import axios from "axios"
export const createUser = async (newUser, email, password) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/signup', {
            newUser,
            email,
            password
        })
        if(response){
            const userID = response.data.user_id
            const token = response.data.token
            localStorage.setItem("GameVault Token", token)
            localStorage.setItem("GameVault User ID", userID)
        }
        return {
            valid: true,
            message: `User created: ${JSON.stringify(response.data, null, 2)}`
        }

    } catch (error) {
        //Handle Axios specific errors
        if (axios.isAxiosError(error)) {
            return {
                valid: false,
                message: `Error Creating user ${error}`
            }
        } else {
            //Handle general errors
            return {
                valid: false,
                message: `Unexpected error ${error}`
            }
        }

    }

}