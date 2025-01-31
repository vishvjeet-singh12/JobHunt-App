import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { UserContext } from "@/Store/Usecontext";
import { Loader2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user, Authorization } = useContext(UserContext);
const navigate=useNavigate();
  // Check if user or user.profile is undefined
  
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    mobile: "",
    bio: "",
    skills: "",
    file: null,
  });

  // Use useEffect to update the form state when the user data is available or when the dialog is opened
  useEffect(() => {
    if (user && open) {
      setInput({
        fullname: user.fullname || "",
        email: user.email || "",
        mobile: user.mobile || "",
        bio: user.profile?.bio || "",
        skills: user.profile?.skills?.join(",") || "", // Convert skills array to string
        file: user.profile?.resume || null,
      });
    }
  }, [user, open]);


  const changeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("mobile", input.mobile);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if(input.file) {
      formData.append("file", input.file);
    }
   
    try {
      setLoading(true);
      const response = await fetch(`https://jobhunt-app-f649.onrender.com/api/profile/update`, {
        method: "PATCH",
        headers: {
          Authorization: Authorization,
        },
        body:formData,
      });
      const result = await response.json();
      if (response.status === 200) {
        if (result.message === "Successfully Data Updated!!") {
          toast.success(`${result.message}`);
          navigate("/profile")
        }
      } else {
        toast.error(`Failed to update: ${result.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating the profile.");
    } finally {
      setLoading(false); // Ensure loading is false when done
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle className="text-center">Update Profile</DialogTitle>
            <hr style={{ marginTop: "5px" }} />
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="fullname"
                  className="text-right font-bold text-md"
                >
                  Name :
                </Label>
                <input
                  id="fullname"
                  name="fullname"
                  value={input.fullname}
                  className="col-span-3 rounded-lg"
                  style={{ border: "2px solid gray", padding: "7px" }}
                  onChange={(e)=>{
                    changeHandler(e)
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right font-bold text-md">
                  Email :
                </Label>
                <input
                  id="email"
                  name="email"
                  value={input.email}
                  className="col-span-3 rounded-lg"
                  style={{ border: "2px solid gray", padding: "7px" }}
                  onChange={(e)=>{
                    changeHandler(e)
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="mobile"
                  className="text-right font-bold text-md"
                >
                  Mobile :
                </Label>
                <input
                  id="mobile"
                  name="mobile" // Fixed typo from "moile" to "mobile"
                  value={input.mobile}
                  className="col-span-3 rounded-lg"
                  style={{ border: "2px solid gray", padding: "7px" }}
                  onChange={(e)=>{
                    changeHandler(e)
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right font-bold text-md">
                  Bio :
                </Label>
                <input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  className="col-span-3 rounded-lg"
                  style={{ border: "2px solid gray", padding: "7px" }}
                  onChange={(e)=>{
                    changeHandler(e)
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="skills"
                  className="text-right font-bold text-md"
                >
                  Skills :
                </Label>
                <input
                  id="skills"
                  name="skills"
                  value={input.skills} // Show comma-separated skills
                  className="col-span-3 rounded-lg"
                  style={{ border: "2px solid gray", padding: "7px" }}
                  onChange={(e)=>{
                    changeHandler(e)
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right font-bold text-md">
                  Resume :
                </Label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  className="col-span-3 rounded-lg"
                  style={{ border: "2px solid gray", padding: "7px" }}
                  onChange={(e)=>{
                   fileHandler(e)
                  }}
                />
              </div>
            </div>
            <DialogFooter>
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
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
