import {useState, useEffect, createContext, useContext} from 'react'
const authContext = createContext()
export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    
    useEffect(()=>{
        const token = localStorage.getItem('Gamevault Token');
        setIsAuthenticated(!!token)
    },[])
    

    return(
        <></>
    )

}