
import { createUser } from "../utils/createUser";
import { getCurrentUser } from "../utils/getCurrentUser";
import { logout } from "../utils/logout";
import { signIn } from "../utils/signIn";
import { validateSignUp } from "../utils/validateSignup";


const AuthService ={
    validateSignUp,
    createUser,
    signIn,
    logout,
    getCurrentUser
}
export default AuthService;