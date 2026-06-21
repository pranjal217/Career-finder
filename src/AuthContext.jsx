import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children })=>{
    const [user, setUser] = useState(null);

    //check if user is laready logged in when the apploads

    useEffect(()=>{
        const savedUser = localStorage.getItem('user');
        if(savedUser) {
    
                setUser(JSON.parse(savedUser));

            
        }
    },[]);

    const login = (userData)=>{
        sessionStorage.storage('user',JSON.stringify(userData));
        setUser(userData);
        
    }
}