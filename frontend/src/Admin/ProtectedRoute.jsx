import { UserContext } from "@/Store/Usecontext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute=({children})=>{
    const {user}=useContext(UserContext);
    const navigate=useNavigate();
     
    useEffect(()=>{
      if(user === null || user.role !== 'recuriter'){
        navigate("/")
      }
    },[]);

    return(
        <>
        {children}
        </>
    )
    }
    export default ProtectedRoute;