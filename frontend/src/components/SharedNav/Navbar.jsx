import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import {Avatar,AvatarImage} from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/Store/Usecontext";

const Navbar = () => {
   const {isLoggedIn}=useContext(UserContext);
   const {user}=useContext(UserContext);
  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Hunt</span>
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <ul className="flex font-medium items-center gap-5">
          {
            user && user.role == "recuriter" ? (
               <>
               <li><Link to="/admin/companies" style={{color:"blue"}}>Companies</Link></li>
               <li><Link to="/admin/jobs" style={{color:"blue"}}>Jobs</Link></li>
               </>
          ):(
          <>
          <li><Link to="/" style={{color:"blue"}}>Home</Link></li>
            <li><Link to="/jobs" style={{color:"blue"}}>Jobs</Link></li>
            <li><Link to="/browse" style={{color:"blue"}}>Browser</Link></li>
          </>
            )}
          </ul>
          {
            !isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Button className="text-red-400 bg-white hover:bg-[#e0d3f6]"><Link to={"/login"}>Login</Link></Button>
              <Button className="bg-blue-600 hover:bg-[#5b30a6]"><Link to={"/signup"}>Sign up</Link></Button>
            </div>
          ) : (
            <Popover className="cursor-pointer">
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 items-center">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio }
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600 mt-2">

                {
                 user && user.role == "student" && (
                        <div className="flex w-fit items-center gap-1 cursor-pointer">
                    <PersonIcon />
                    <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                  </div>
                 )
                }
                  
                  <div className="flex w-fit items-center gap-1 cursor-pointer">
                    <LogoutIcon />
                    <Button variant="link"><Link to={"/logout"}>Logout</Link></Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
