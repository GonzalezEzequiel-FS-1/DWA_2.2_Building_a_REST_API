
import { createUser } from "../utils/createUser";
import { getCurrentUser } from "../utils/getCurrentUser";
import { logout } from "../utils/logout";
import { signIn } from "../utils/signIn";


const AuthService ={
    createUser,
    signIn,
    logout,
    getCurrentUser
}
export default AuthService;