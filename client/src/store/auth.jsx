import { createContext, useContext, useEffect, useState } from "react";

export const Authcontext = createContext();

export const AuthProvider = ({children})=>{
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setuser]=useState("");
    const storeTokenInLS = (serverToken)=>{
        return localStorage.setItem("token",serverToken);
    }


    let isLoggedIn = !!token;
    console.log(isLoggedIn);
    //Logout
    const LogoutUser = ()=>{
        setToken("");
        return localStorage.removeItem("token");
    }


    //JWT Authnetication
    const userAuthentication = async ()=>{
        try {
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers:{
                    Authorization: `Bearer ${token}`, 
                }
            });
            if(response.ok){
                const data = await response.json();
                console.log("user data", data.userData);
                setuser(data.userData);
            }
        } catch (error) {
            console.error("Error when fetching user data");
        }
    }
    useEffect(()=>{
        userAuthentication();
    },[]);

    return (
        <Authcontext.Provider value={{storeTokenInLS, LogoutUser, isLoggedIn, user}}>
            {children}
        </Authcontext.Provider>
    )
}


export const useAuth =()=>{
    const authContextvalue = useContext(Authcontext);
    if(!authContextvalue){
        throw new Error("useAuth used outside of the provider");
    }
    return authContextvalue;
}