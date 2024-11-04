import { Route, Routes } from "react-router-dom"
import Home from "./MainComponent/Home"
import Login from "./MainComponent/Login"
import Signup from "./MainComponent/Signup"
import Logout from "./MainComponent/Logout"
import Jobs from "./MainComponent/Jobs"
import Browse from "./MainComponent/Browse"
import Profile from "./MainComponent/Profile/Profile"
import JobDescription from "./MainComponent/JobDescription"
import Companies from "./Admin/Companies"
import CompanyCreate from "./Admin/CompanyCreate"
import CompanySetup from "./Admin/CompanySetup"
import AdminJobs from "./Admin/AdminJobs"
import PostJob from "./Admin/PostJob"
import Applicants from "./Admin/Applicants"
import ProtectedRoute from "./Admin/ProtectedRoute"

const App = () => {
  return (
    <>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/jobs" element={<Jobs/>}/>
      <Route path="/description/:id" element={<JobDescription/>}/>
      <Route path="/browse" element={<Browse/>}/>
      <Route path="/profile" element={<Profile/>}/>

      {'/* Here admin Start Aur ProtectedRoute isliye lagaya hai ki koi bhi student company create na kr sake */'}
      <Route path="/admin/companies" element={<ProtectedRoute><Companies/></ProtectedRoute>}/>
      <Route path="/admin/companies/create" element={<ProtectedRoute><CompanyCreate/></ProtectedRoute>}/>
      <Route path="/admin/companies/:id" element={<ProtectedRoute><CompanySetup/></ProtectedRoute>}/>
      <Route path="/admin/jobs" element={<ProtectedRoute><AdminJobs/></ProtectedRoute>}/>
      <Route path="/admin/jobs/create" element={<ProtectedRoute><PostJob/></ProtectedRoute>}/>
      <Route path="/admin/jobs/applicants/:id" element={<ProtectedRoute><Applicants/></ProtectedRoute>}/>
     </Routes>
    </>
  )
}

export default App
