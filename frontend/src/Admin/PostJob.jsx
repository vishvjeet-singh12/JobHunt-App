import Navbar from "@/components/SharedNav/Navbar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserContext } from "@/Store/Usecontext";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experienceLevel: "",
    location: "",
    jobType: "",
    position: 0,
    companyId: "",
  });

   const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
  const { companies } =useSelector((store) => store.company);
  const {Authorization}=useContext(UserContext);

  const changeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const selectChangeHandler=async(value)=>{
    const selectedCompany=companies.find((company)=> company.name.toLowerCase() === value);
       setInput({
        ...input,
        companyId:selectedCompany._id
       })
      };

  const submitHandler=async(e)=>{
    e.preventDefault();
   
    try {
      setLoading(true);
        const response=await fetch(`https://jobhunt-app-1-tjyg.onrender.com/job/postJobs`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Authorization":Authorization
          },
          body:JSON.stringify(input),
          credentials:"include"
        })
        const responseData=await response.json().then((result)=>{
            
            if(response.status ===200){
              
               toast.success(result.message);
               navigate("/admin/jobs");
            }
        })
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-300 shadow-xl rounded-md">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label>Title</Label>
              <input
                type="text"
                name="title"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.title}
                onChange={(e) => {
                  changeHandler(e);
                }}
                style={{
                  padding: "10px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
              />
            </div>
            <div>
              <Label>Description</Label>
              <input
                type="text"
                name="description"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.description}
                onChange={(e) => {
                  changeHandler(e);
                }}
                style={{
                  padding: "10px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
              />
            </div>
            <div style={{ marginTop: "-15px" }}>
              <Label>Requirements</Label>
              <input
                type="text"
                name="requirements"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.requirements}
                onChange={(e) => {
                  changeHandler(e);
                }}
                style={{
                  padding: "10px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
              />
            </div>
            <div style={{ marginTop: "-15px" }}>
              <Label>Salary</Label>
              <input
                type="number"
                name="salary"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full"
                value={input.salary}
                onChange={(e) => {
                  changeHandler(e);
                }}
                style={{
                  padding: "10px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
              />
            </div>
            <div style={{ marginTop: "-15px" }}>
              <Label>Experience</Label>
              <input
                type="number"
                name="experienceLevel"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full"
                value={input.experienceLevel}
                onChange={(e) => {
                  changeHandler(e);
                }}
                style={{
                  padding: "10px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
              />
            </div>
            <div style={{ marginTop: "-15px" }}>
              <Label>Location</Label>
              <input
                type="text"
                name="location"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full"
                value={input.location}
                onChange={(e) => {
                  changeHandler(e);
                }}
                style={{
                  padding: "10px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
              />
            </div>
            <div style={{ marginTop: "-15px" }}>
              <Label>JobType</Label>
              <input
                type="text"
                name="jobType"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full"
                value={input.jobType}
                onChange={(e) => {
                  changeHandler(e);
                }}
                style={{
                  padding: "10px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
              />
            </div>
            <div style={{ marginTop: "-15px" }}>
              <Label>Position</Label>
              <input
                type="number"
                name="position"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full"
                value={input.position}
                onChange={(e) => {
                  changeHandler(e);
                }}
                style={{
                  padding: "10px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
              />
            </div>
            {/*hume konsi company me job post krni hai ye select krenge */}
            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => {
                      return (
                        <SelectItem key={company._id} value={company.name.toLowerCase()}>
                          {company.name} 
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Post New Jobs
            </Button>
          )}
          {companies.length == 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please Register a company first, before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
