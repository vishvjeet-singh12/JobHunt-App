import { UserContext } from "@/Store/Usecontext"
import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "@/Store/Redux/SliceStore";

const useGetAllJobs = () => {
    const {Authorization}=useContext(UserContext);
    const dispatch=useDispatch();
    const {searchQuery}=useSelector(store=>store.job)
    useEffect(()=>{
        const fetchAllJobs=async()=>{
            try {
                const response=await fetch(`https://jobhunt-app-1-tjyg.onrender.com/job/getAllJobs?keyword=${searchQuery}`,{
                    method:"GET",
                    headers:{
                    "Authorization":Authorization
                    }
                })
                const data=await response.json().then((result)=>{
                    
                    if(response.status===200){
                         dispatch(setAllJobs(result.data))
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetAllJobs
