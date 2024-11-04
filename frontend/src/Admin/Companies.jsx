import Navbar from "@/components/SharedNav/Navbar";
import { Button } from "@/components/ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Target } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/Store/Redux/SliceStore";

const Companies = () => {
  const navigate=useNavigate();
   const [input,setInput]=useState("");
   const dispatch=useDispatch();
   useEffect(()=>{
     dispatch(setSearchCompanyByText(input));
   },[input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
        <div>
        <input type="text" style={{padding:"10px",border:"2px solid black",borderRadius:"10px",backgroundColor:"white"}} placeholder="Filter By Company Name"
         onChange={(e)=>setInput(e.target.value)}
        />
        </div> 
          <div>
            <Button onClick={()=>{
              navigate("/admin/companies/create");
            }}>New Company</Button>
          </div>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  );
};

export default Companies;
