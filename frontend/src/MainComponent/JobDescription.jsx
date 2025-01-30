import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserContext } from "@/Store/Usecontext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const JobDescription = () => {
    const {Authorization,user}=useContext(UserContext);
    const [data,setData]=useState([]);
    const isInitiallyApplied=data?.applications?.some(application=>application.applicant == user?._id) || false;
    const [isApplied,setIsApplied]=useState(isInitiallyApplied)
    
    const params=useParams();

  const applyJobHandler=async()=>{
    try {
      const response=await fetch(`http://localhost:4000/application/applyJob/${params.id}`,{
        method:"GET",
        headers:{
          "Authorization":Authorization
        },
      })
      const responsedata=await response.json().then((result)=>{
            if(response.status===200){
            
              setIsApplied(true);    //update the local state
              const updatedSingleJob={...data,applications:[...data.applications,{applicant:user?._id}]};
              setData(updatedSingleJob);   //help us to realtime UI update
              toast.success(result.message);
            }else{
              toast.error(result.message);
            }
      })
    } catch (error) {
      console.log(error);
    }
  }

    const getJobById=async()=>{
        try {
           const response=await fetch(`http://localhost:4000/job/getJobBy/${params.id}`,{
              method:"GET",
              headers:{
                "Authorization":Authorization
              }
           })
           const responsedata=await response.json().then((result)=>{
              
                if(response.status===200){
                    
                    setData(result.data);
                    setIsApplied(result.data.applications.some(application=>application.applicant== user?._id))
                }
                
           })
        } catch (error) {
          console.log(error);
        }
    }
    useEffect(()=>{
      getJobById();
      // applyJobHandler();
    },[])
  return (
    <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
       <div>
       <h1 className="font-bold text-xl">{data.title}</h1>
       <div className="flex items-center gap-2 mt-4">
      <Badge className={"text-blue-700 font-bold"} variant="ghost">{data.position} Positions</Badge>
      <Badge className={"text-[#F83002] font-bold"} variant="ghost">{data.jobType}</Badge>
      <Badge className={"text-[#7909b7] font-bold"} variant="ghost">{data.salary} LPA</Badge>
    </div>
    </div>
    <div>
     <Button  onClick={isApplied ? null : applyJobHandler}
      className={`rounded-lg ${isApplied ? 'bg-[#5ab648] hover:bg-[#5ab648] cursor-not-allowed':'bg-[#7209b7] hover:bg-[#5d0796]'}`}>{isApplied ? "Already Applied" : "Apply Now"}</Button>
    </div>
    </div>
    <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
    <div className="my-4">
    <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">{data.title}</span></h1>
    <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{data.location}</span></h1>
    <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{data.description}</span></h1>
    <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">{data.experienceLevel} yrs</span></h1>
    <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">{data.salary} LPA</span></h1>
    <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">{data?.applications?.length}</span></h1>
    <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">{data.createdAt}</span></h1>
    </div>
    </div>
  )
}

export default JobDescription
