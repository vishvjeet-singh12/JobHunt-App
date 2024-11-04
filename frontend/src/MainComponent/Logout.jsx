import { UserContext } from "@/Store/Usecontext"
import { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom";

const Logout = () => {
  const {isLogout}=useContext(UserContext);
  useEffect(()=>{
      isLogout();
  },[isLogout]);
  return (
    <Navigate to="/login"/>
  )
}

export default Logout
