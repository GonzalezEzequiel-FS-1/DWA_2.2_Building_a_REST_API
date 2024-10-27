import { getCurrentUser } from "../utils/getCurrentUser"

export const authHeader = async () =>{
    const userData = await getCurrentUser()
    if(userData.ID && userData.Token){
        return {
            "Authorization":`Bearer ${userData.Token}`
        }
    }else{
        null
    }
}