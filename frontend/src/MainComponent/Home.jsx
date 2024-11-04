import Navbar from "@/components/SharedNav/Navbar"
import HeroSection from "./HeroSection"
import CategoryCrousel from "./CategoryCrousel"
import LatestJobs from "./LatestJobs"
import Footer from "./Footer"
import useGetAllJobs from "@/hook/useGetAllJobs"
import { useContext, useEffect } from "react"
import { UserContext } from "@/Store/Usecontext"
import { useNavigate } from "react-router-dom"
const Home = () => {
  useGetAllJobs();
const {user}=useContext(UserContext);
 const navigate=useNavigate();
   useEffect(()=>{
     if(user?.role === "recuriter"){
      navigate("/admin/companies")
     }
   })
  return (
    <div>
       <Navbar/>
       <HeroSection/>
       <CategoryCrousel/>
       <LatestJobs/>
       <Footer/>
    </div>
  )
}

export default Home
