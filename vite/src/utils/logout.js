export const logout = () =>{
    localStorage.clear();
    if(localStorage.length === 0){
        return {
            valid:true,
            message:`Local Storage Cleared`
        }
    }else{
        return {
            valid:false,
            message:`Error Clearing Local Storage`
        }
    }
}