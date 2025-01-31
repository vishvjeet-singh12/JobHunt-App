import Navbar from "@/components/SharedNav/Navbar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { UserContext } from "@/Store/Usecontext"
import { useContext, useState } from "react"
import { useDispatch } from "react-redux"
import {useNavigate } from "react-router-dom"
import { toast} from "sonner"
import { setSingleCompany } from "@/Store/Redux/SliceStore"

const CompanyCreate = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
      const {Authorization}=useContext(UserContext);
      const [companyName,setCompanyName]=useState({
        companyname:""
      });
      const changeHandler=async(event)=>{
        let name=event.target.name;
        let value=event.target.value;

        setCompanyName({ 
          ...companyName,
          [name]:value
        })
      }

    const registerNewCompany=async()=>{
      try {
          const response=await fetch(`https://jobhunt-app-f649.onrender.com/company/companyRegisteration`,{
              method:"POST",
              headers:{
                   "Content-Type":"application/json",
                   "Authorization":Authorization
              },
              body:JSON.stringify(companyName),
              credentials:"include"
          })
          const reponseData=await response.json().then((result)=>{
               if(response.status===200){
                  toast.success(result.message);
                    dispatch(setSingleCompany(result.data))
                  const companyId=result.data._id
                  navigate(`/admin/companies/${companyId}`)
               }
               else{
                toast.error(result.message)
               }
          })
      } catch (error) {
        console.log(error);
      }
    }
    
  return (
    <div>
    <Navbar/>
    <div  className="max-w-4xl mx-auto">
    <div className="my-10">
    <h1 className="font-bold text-2xl">Your Company</h1>
    <p className="text-gray-400">What would you like to give your company name? you can change this later.</p>
   </div>
    <Label>Company Name</Label>
    <input type="text" name="companyname" value={companyName.companyname} placeholder="JobHunt, Microsoft etc." style={{padding:"10px",border:"2px solid black",borderRadius:"5px",}} 
     onChange={(e)=>{
      changeHandler(e);
     }}
    />
    <div className="flex items-center gap-2 my-4">
    <div>
     <Button className="bg-red-500" onClick={()=>{
        navigate("/admin/companies")
       }}>Cancel</Button></div>
     <div><Button onClick={registerNewCompany}>Continue</Button></div>
    </div>
    </div>
    </div>
  )
}

export default CompanyCreate
