import Navbar from "@/components/SharedNav/Navbar"
import ApplicantsTable from "./ApplicantsTable"
import { useDispatch, useSelector } from "react-redux"
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "@/Store/Usecontext";
import { setAllApplicants } from "@/Store/Redux/SliceStore";

const Applicants = () => {
    const dispatch=useDispatch();
    const params=useParams();
    const {Authorization}=useContext(UserContext);
    const {applicants}=useSelector(store=>store.application)

    useEffect(() => {
      const fetchAllApplicants = async () => {
          try {
             const response=await fetch(`https://jobhunt-app-1-tjyg.onrender.com/application/getApplicants/${params.id}`,{
              method:"GET",
              headers:{
                "Authorization":Authorization
              }
             })
              const responseData=await response.json().then((result)=>{
                  if(response.status===200){
                    dispatch(setAllApplicants(result.job))
                  }
              })
          } catch (error) {
              console.log(error);
          }
      }
      fetchAllApplicants();
  }, []);
  return (
    <div>
    <Navbar/>
    <div className="max-w-7xl mx-auto">
    <h1 className="font-bold text-xl my-4">Applicants ({applicants?.applications?.length})</h1>
     <ApplicantsTable/>
    </div>
    </div>
  )
}

export default Applicants
