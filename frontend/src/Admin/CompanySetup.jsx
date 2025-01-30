import Navbar from "@/components/SharedNav/Navbar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserContext } from "@/Store/Usecontext";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CompanySetup = () => {
  const {Authorization}=useContext(UserContext);
  const params=useParams();
  const navigate=useNavigate();

   const [singleCompany,setSingleCompany]=useState("");
  const [loading,setLoading]=useState(false);
  const [input, setInput] = useState({
    name:"",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  const changeHandler = async(event)=>{
    let name = event.target.name;
    let value = event.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };
  const fileChangeHandler=async(e)=>{
    const file=e.target.files?.[0];
     setInput({
      ...input,
      file
     })
  }
   
  const companyById=async()=>{
    try {
        const response=await fetch(`http://localhost:4000/company/getCompany/${params.id}`,{
          method:"GET",
          headers:{
            "Authorization":Authorization
          },
          credentials:"include"
        })
        const responseData=await response.json().then((result)=>{
             if(response.status===200){
               
                  setSingleCompany(result.company);
             }
        })
    } catch (error) {
      console.log(error);
    }
  }

  const submitHandler=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
     formData.append("name",input.name);
     formData.append("description",input.description);
     formData.append("website",input.website);
     formData.append("location",input.location);
     if(input.file){
      formData.append("file",input.file);
     }
    try {
      setLoading(true);
     const response=await fetch(`http://localhost:4000/company/updateCompany/${params.id}`,{
      method:"PATCH", 
      headers:{
        "Authorization":Authorization
      },
      body:formData,
      credentials:"include"
     })
     const data=await response.json().then((result)=>{
         
          if(response.status===200){
             
            toast.success(result.message);
            navigate("/admin/companies")
          }
     })
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    companyById();
  },[])
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
          <div className="flex items-center gap-5 p-8">
            <div>
              <Button onClick={()=>navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold w-40">
                <ArrowLeft />
                <span>Back</span>
              </Button>
            </div>
            <div>
              <h1 className="font-bold text-xl">Company Setup</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <input
              style={{padding:"10px", border:"1px solid black"}}
                type="text"
                name="name"
                value={input.name}
                onChange={(e)=>{
                  changeHandler(e);
                }}
              />
            </div>
            <div>
              <Label>Description</Label>
              <input
              style={{padding:"10px", border:"1px solid black"}}
                type="text"
                name="description"
                value={input.description}
                onChange={(e)=>{
                  changeHandler(e);
                }}
              />
            </div> 
            <div style={{marginTop:"-15px"}}>
            <Label>Website</Label>
            <input
            style={{padding:"10px", border:"1px solid black"}}
              type="text"
              name="website"
              value={input.website}
              onChange={(e)=>{
                changeHandler(e);
              }}
            />
          </div> 
          <div style={{marginTop:"-15px"}}>
          <Label>Location</Label>
          <input
          style={{padding:"10px", border:"1px solid black"}}
            type="text"
            name="location"
            value={input.location}
            onChange={(e)=>{
              changeHandler(e);
            }}
          />
        </div> 
        <div style={{marginTop:"-15px",marginBottom:"20px"}}>
        <Label>Logo</Label>
        <input
          type="file"
          accept="image/*"
          onChange={(e)=>{
            fileChangeHandler(e);
          }}
        />
      </div> 
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update Profile
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
