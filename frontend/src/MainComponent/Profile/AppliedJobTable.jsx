import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { setAllAppliedJobs } from "@/Store/Redux/SliceStore";
import { UserContext } from "@/Store/Usecontext";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

const AppliedJobTable = () => {
    const dispatch=useDispatch();
    const {Authorization}=useContext(UserContext);
    const {allAppliedJobs}=useSelector(store=>store.job)

    useEffect(()=>{
        const fetchAppliedJobs=async()=>{
             try {
                const response=await fetch(`http://localhost:4000/application/getAppliedJob`,{
                  method:"GET",
                  headers:{
                    "Authorization":Authorization
                  }
                })
                const responseData=await response.json().then((result)=>{
                        if(response.status===200){
                            dispatch(setAllAppliedJobs(result.application));
                        }
                })
             } catch (error) {
              console.log(error);
             }
        }
        fetchAppliedJobs();
    },[])

  return (
    <div>
        <Table>
          <TableCaption>A list of your applied jobs</TableCaption>
          <TableHeader>
           <TableRow>
           <TableHead className="text-center">Date</TableHead>
           <TableHead className="text-center">Job Role</TableHead>
           <TableHead className="text-center">Company Name</TableHead>
           <TableHead className="text-center">Status</TableHead>
           </TableRow>
          </TableHeader> 
          <TableBody>
              {
                allAppliedJobs.length <=0 ? <span>You have not applied any job yet.</span> : allAppliedJobs.map((appliedJob)=>{
                    return(
                        <TableRow key={appliedJob._id}>
                         <TableCell className="text-center font-medium">{appliedJob.createdAt.split("T")[0]}</TableCell>
                         <TableCell className="text-center font-medium">{appliedJob.job.title}</TableCell>
                         <TableCell className="text-center font-medium">{appliedJob.job.company.name}</TableCell>
                         <TableCell className="text-center font-medium">
                         <Badge
                          className={`${appliedJob.status === "rejected" ? 'bg-red-600' : appliedJob.status === 'pending' ? 'bg-gray-500' : "bg-green-600"}`} 
                           style={{padding:"8px",borderRadius:"5px"}}
                          >
                         {appliedJob.status.toUpperCase()}
                         </Badge></TableCell>
                        </TableRow>
                    )
                })
              }
           </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable
