import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const [allJobs,setAllJobs] = useState([]);
  const { Authorization } = useContext(UserContext);
  const navigate=useNavigate();
  

  // const dispatch=useDispatch();
  //   // const {companies,searchCompanyByText}=useSelector(store=>store.company)
  //   const {allAdminJobs,searchJobByText}=useSelector(store=>store.job);
  //   const [filterJob,setFilterJob]=useState(allAdminJobs);
     
  //   useEffect(()=>{
  //       const filteredJob=allAdminJobs.length >=0 && allAdminJobs.filter((job)=>{
  //         if(!searchJobByText){
  //           return true
  //         };
  //         return job.title.toLowerCase().includes(searchJobByText.toLowerCase())
  //       })
  //       setFilterJob(filteredJob);
  //   },[allAdminJobs,searchJobByText])

  const getAllAdminJobs = async () => {
    try {
      const response = await fetch(`http://localhost:4000/job/getAdminJob`, {
        method: "GET",
        headers: {
          Authorization: Authorization,
        },
      });
      const responseData = await response.json().then((result) => {
        console.log(result.message);
        if (response.status === 200) {
          console.log(result.data);
          setAllJobs(result.data);
          // dispatch(setAllAdminJobs(result.data));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllAdminJobs();
  }, []);
  return (
    <div>
      <Table className="font-semibold">
        <TableCaption>A List of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold">Company Name</TableHead>
            <TableHead className="text-center font-bold">Role</TableHead>
            <TableHead className="text-center font-bold">Date</TableHead>
            <TableHead className=" font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allJobs.length <= 0 ? (
            <span>You have not registered any company yet.</span>
          ) : (
            <>
              {allJobs.map((job) => {
                return (
                  <TableRow key={job._id}>
                    <TableCell className="text-center">
                      {job.company.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {job.title}
                    </TableCell>
                    <TableCell className="text-center">
                      {job.createdAt.split("T")[0]}
                    </TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="w-32">
                          <div onClick={()=>{navigate(`/admin/companies/${job._id}`)}} className="flex items-center gap-2 w-fit cursor-pointer" >
                            <Edit2  className="w-4"/>
                            <span>Edit</span>
                          </div>
                          <div onClick={()=>{  navigate(`/admin/jobs/applicants/${job._id}`)}} className="flex items-center w-fit gap-2 cursor-pointer mt-3">
                          <Eye className="w-4"/>
                          <span>Applicants</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
