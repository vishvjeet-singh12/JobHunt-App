import Navbar from "@/components/SharedNav/Navbar";
// import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,FormControlLabel,Radio,RadioGroup} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { UserContext } from "@/Store/Usecontext";
const Signup = () => {
  const[input,setInput]=useState({
    fullname:"",
    email:"",
    password:"",
    mobile:"",
    role:"",
    file:null
  })
  const navigate=useNavigate();
  const {user}=useContext(UserContext);

  const changeHandler=(event)=>{
   let name=event.target.name;
   let value=event.target.value;
      
   setInput({
     ...input,
     [name]:value
   })
  }
  const changeFileHandler=(event)=>{
     setInput({
      ...input,
      file:event.target.files?.[0]
     })
  }
 const formSubmit=async(e)=>{
    e.preventDefault();
    const formData = new FormData();

    // Append each field to the FormData object
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("mobile", input.mobile);
    formData.append("role", input.role);
  
    // Append the file (profile photo)
    if(input.file){
      formData.append("file", input.file);
    }
 
      try {
        const response=await fetch(`http://localhost:4000/api/userRegisteration`,{
          method: "POST",
          body: formData,
          credentials: "include"
        })
        const data=await response.json().then((result)=>{
              
               if(response.status ===200){
                    if(result.message==="Registered Successfully!!" || result.message==="User already exist"){
                          
                      toast.success(result.message);
                      navigate("/login");
                    }
                    else {
                      toast.error(result.message); 
                    }
               }
        })
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
 }

 {/*ye isliye kyuki agar user loggedin hai to login page na active ho */}
 useEffect(()=>{
  if(user){
    navigate("/");
  }
})

  return (
    <div>
      <Navbar />
      <div>
        <div
          // className="registercss"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8am9ifGVufDB8fDB8fHww)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            backgroundAttachment: "fixed",
          }}
           className="flex items-center justify-center max-w-7xl w-screen mx-auto"
        >
          <form onSubmit={formSubmit} className="w-1/2  rounded-md p-4 my-10">
            <div className="content">
              <h1 className="text-center font-bold text-xl">Sign Up</h1>
              <h4 className="text-center mb-3">
                Please fill this form to create an account.
              </h4>
              <hr className="mb-4"></hr>
              <label>
                <b>Fullname</b>
              </label>
              <input
                type="text"
                name="fullname"
                placeholder="Enter Name"
                value={input.fullname}
                required
                onChange={(e)=>{
                  changeHandler(e);
                }}
              />
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
              <label>
                <b>Phone Number</b>
              </label>
              <input type="phone" name="mobile" value={input.mobile} required
              onChange={(e)=>{
                changeHandler(e);
              }} />

              <div className="flex items-center justify-between">
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="student"
                      name="role"
                      checked={input.role==='student'}
                      onChange={(e)=>{
                        changeHandler(e);
                      }}
                      control={<Radio />}
                      label="Student"
                    />
                    <FormControlLabel
                      value="recuriter"
                      name="role"
                      checked={input.role==='recuriter'}
                      onChange={(e)=>{
                        changeHandler(e);
                      }}
                      control={<Radio />}
                      label="Recuriter"
                    />
                  </RadioGroup>
                </FormControl>
                <div className="flex items-center gap-2" style={{width:"50%"}}>
                 <label>Profile</label>
                 <input 
                 accept="image/*"
                 type="file"
                  className="cursor-pointer"
                  onChange={(e)=>{
                    changeFileHandler(e);
                  }}
                 />
                </div>
              </div>
              <div className="clearfix">
                <button type="submit" className="btn" style={{backgroundColor:" #0eb7f4",padding:"8px",marginTop:'10px',color:"white"}}>
                  Sign Up
                </button>
              </div>
              <div className="signup-link" style={{ fontWeight: "bold"}}>
                Have an account?{" "}
                <Link to="/login" style={{ color: "red" }}>
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
