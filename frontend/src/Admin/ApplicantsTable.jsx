import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserContext } from "@/Store/Usecontext";
import { MoreHorizontal } from "lucide-react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const shortListingArray = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  const {applicants}=useSelector(store=>store.application);
  const {Authorization}=useContext(UserContext);
 
  const statusHandler=async(status,id)=>{
    try {
      
        const response=await fetch(`http://localhost:4000/application/updatestatus/${id}`,{
          method:"POST",
          headers:{ 
             "Authorization":Authorization,
             "Content-Type":"application/json",
          },
          body:JSON.stringify({status}),
        })
        const responseData=await response.json().then((result)=>{
            if(response.status===200){

              toast.success(result.message)
            }else {
              toast.error(responseData.message || "Something went wrong");
            }
        })
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  }
  return (
    <div>
      <Table>
        <TableCaption>A list of recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {   applicants && applicants.applications.map((item,index)=>{
               return(
                <TableRow key={index}>
                <TableCell className="font-medium">{item.applicant.fullname}</TableCell>
                <TableCell className="font-medium">{item.applicant.email}</TableCell>
                <TableCell className="font-medium">{item.applicant.mobile}</TableCell>
                <TableCell className="font-medium text-blue-600 cursor-pointer">
                 {
                  item.applicant.profile.resume ? <a href={item.applicant.profile.resume} target="_blank" rel="noopener noreferrer">{item.applicant.profile.resumeOriginalName}</a> : <span>NA</span>
                 }
                </TableCell>
                <TableCell className="font-medium">{item.applicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className="cursor-pointer font-medium">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortListingArray.map((status, index) => {
                        return (
                          <div onClick={()=>statusHandler(status,item._id)} key={index} className="flex w-fit items-center my-2 cursor-pointer">
                            <span className={`${status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'}`} style={{border:"2px solid white",padding:"5px",borderRadius:"5px",color:"white"}}>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>

               )
        })

        }
         
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
