import Navbar from "@/components/SharedNav/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AdminJobsTable from "./AdminJobsTable";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {setSearchJobByText } from "@/Store/Redux/SliceStore";

const AdminJobs = () => {
  const navigate=useNavigate();
  // const [input,setInput]=useState("");
  // const dispatch=useDispatch();
  // useEffect(()=>{
  //   dispatch(setSearchJobByText(input));
  // },[input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <h1 className="font-bold text-2xl">All Jobs<span><hr/></span></h1>  
        <div>
            <Button onClick={()=>{
              navigate("/admin/jobs/create");
            }}>New Jobs</Button>
          </div>
        </div>
       <AdminJobsTable/>
      </div>
    </div>
  );
};

export default AdminJobs;
