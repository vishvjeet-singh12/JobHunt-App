import Navbar from "@/components/SharedNav/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import EditIcon from "@mui/icons-material/Edit";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import AppliedJobTable from "./AppliedJobTable";

import { useContext, useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { UserContext } from "@/Store/Usecontext";

//const skills=["Html","Css","Javasrcipt","Reactjs","Nodejs","MongoDB"];
const isResume=true;
const Profile = () => {
  const [open,setOpen]=useState(false);
  const {user,setUser} = useContext(UserContext);

  const fullname = user?.fullname || "No Name";
  const bio = user?.profile?.bio || "No bio available";
  const skills = user?.profile?.skills || [];
  const email = user?.email || "No Email";
  const mobile = user?.mobile || "No Mobile";
  const resumeUrl = user?.profile?.resume || "";
  const resumeOriginalName = user?.profile?.resumeOriginalName || "";

  return (
    <div>
      <Navbar />
      <div className="p-8 max-w-4xl my-5 mx-auto border border-gray-300 shadow-lg rounded-md">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{fullname}</h1>
              <p>{bio}</p>
            </div>
          </div>
          <div>
            <button onClick={()=>setOpen(true)} style={{border:"2px solid black",padding:"6px",color:"green"}}><EditIcon /></button>
          </div>
        </div>
        <div className="my-4">
         <div className="flex items-center gap-4 mb-2"> <Mail/><span>{email}</span> </div>
         <div className="flex items-center gap-4"> <Contact/><span>{mobile}</span> </div>
        </div>
        <div className="my-5">
          <h1 className="font-bold text-lg mb-1">Skills</h1>
          <div className="flex items-center gap-1">
          {
            skills.length !==0 ? skills.map((item,index)=>{
                return(
                        <Badge key={index}>{item}</Badge> 
                )
            }) :  <span>NA</span>
          }
          </div>
        </div>
        <div className="grid  w-full max-w-sm items-center gap-1.5">
           <Label className="text-md font-bold">Resume</Label>
           {isResume ? 
            <a target="_blank" href={resumeUrl} className="text-blue-500 hover:underline w-full cursor-pointer">
              {resumeOriginalName}
            </a>: <span>NA</span>
          }
        </div>
      </div>
      <div className="p-8 max-w-4xl my-5 mx-auto border border-gray-300 shadow-xl rounded-md">
      <h1 className="font-bold text-lg my-3 text-center">Applied Jobs</h1><span><hr></hr></span>
      <AppliedJobTable/>
    </div>
    <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;
