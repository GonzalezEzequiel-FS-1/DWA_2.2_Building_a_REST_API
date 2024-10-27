import axios from `axios`;
import { authHeader } from "./auth-header";

export const getAllPrivateUsers = async () =>{
    const response = await axios.get(`http://localhost:3000/users`)
}