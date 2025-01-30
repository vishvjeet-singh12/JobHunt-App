import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
import {
  FormControl,FormControlLabel,Radio,RadioGroup} from "@mui/material";
import Navbar from "@/components/SharedNav/Navbar";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { UserContext } from "@/Store/Usecontext";
const Login = () => {
  const[input,setInput]=useState({
    email:"",
    password:"",
    role:"",
  })
  const {storageTokenLs,user}=useContext(UserContext);
  const navigate=useNavigate();
  const changeHandler=(event)=>{
    let name=event.target.name;
    let value=event.target.value;
       
    setInput({
      ...input,
      [name]:value
    })
   }
   const formSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response=await fetch(`  http://localhost:4000/api/portalLogin`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(input),
        credentials:"include"
      })
      const data=await response.json().then((result)=>{
             
             if(response.status ===200){
                  if(result.message==="Successfully Loggedin!!"){
                    
                    storageTokenLs(result.token) 
                    navigate("/");   
                    toast.success(`Welcome ${result.data.fullname}`)
                  }
                  else if(result.message==="User is not exist" || result.message==="Account doesn't exist with current role"){
                    
                    toast.error(result.message)
                  }
                  else if(result.message==="Invalid Email or Password"){
                    toast.error(result.message); 
                  }
             }
      })
    } catch (error) {
      console.log(error);
    }
 }
 
  {/*ye isliye kyuki agar user loggedin hai to signup page na active ho */}
    useEffect(()=>{
      if(user){
        navigate("/");
      }
    })
   
  return (
    <div>
    <Navbar/>
    <div
    // className="registercss"
    style={{
      backgroundImage:
        "url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8am9ifGVufDB8fDB8fHww)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100%",
      backgroundAttachment: "fixed",
    }}
    className="flex items-center justify-center max-w-7xl mx-auto"
    >
    <form onSubmit={formSubmit} className="w-1/2  rounded-md p-4 my-10">
    <div className="content">
      <h1 className="text-center font-bold text-xl">Log In</h1>
      <h4 className="text-center mb-3">
        Please fill this form to create an account.
      </h4>
      <hr className="mb-4"></hr>
      <label>
        <b>Email</b>
      </label>
      <input
        type="text"
        placeholder="Enter Email"
        name="email"
        value={input.email}
        required
        onChange={(e)=>{
          changeHandler(e);
        }}
      />
      <label>
        <b>Password</b>
      </label>
      <input
        type="password"
        placeholder="Enter Password"
        name="password"
        value={input.password}
        required
        onChange={(e)=>{
          changeHandler(e);
        }}
      />
      <div className="flex items-center justify-between">
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="student"
              control={<Radio />}
              label="Student"
              name="role"
              checked={input.role==='student'}
              onChange={(e)=>{
                changeHandler(e);
              }}
            />
            <FormControlLabel
              value="recuriter"
              control={<Radio />}
              label="Recuriter"
              name="role"
              checked={input.role==='recuriter'}
               onChange={(e)=>{
                changeHandler(e);
              }}
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="clearfix">
        <button type="submit" className="btn" style={{backgroundColor:" #0eb7f4",padding:"8px",marginTop:'10px',color:"white"}}>
          Login
        </button>
      </div>
      <div className="signup-link" style={{ fontWeight: "bold",display:"flex",justifyContent:"center",gap:"6px"}}>
         <p>Don`t have an acccount?</p>
        <Link to="/signup" style={{ color: "red" }}>
          Sign up
        </Link>
      </div>
    </div>
  </form>
    </div>
    </div>
  )
}

export default Login
