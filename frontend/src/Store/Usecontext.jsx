import { createContext, useEffect, useState } from "react";

 export const UserContext=createContext();
 const UserContextList=({children})=>{
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [user,setUser]=useState(null);
    const Authorization=`Bearer ${token}`;

    const storageTokenLs=(serverToken)=>{
          setToken(serverToken);
          return localStorage.setItem("token",serverToken);
    }
    const isLoggedIn=!!token;
    const isLogout=()=>{
        setToken("");
        setUser(null)
        return localStorage.removeItem("token");
    }

    const Authentication=async()=>{
        if (!token) return;
        try {
            const response=await fetch(`http://localhost:4000/api/portalUser`,{
                method:"GET",
                headers:{
                    "Authorization":Authorization
                }
            })
            const data=await response.json().then((result)=>{
                  console.log(result.message);
                  if(response.status===200){
                      console.log(result.data);
                      setUser(result.data);
                  }
            })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        Authentication();
    },[token])
    return <UserContext.Provider value={{storageTokenLs,user,isLoggedIn,isLogout,Authorization}}>{children}</UserContext.Provider>
 }
 export default UserContextList;