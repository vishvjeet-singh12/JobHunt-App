import { Button } from '@/components/ui/button';
import { setSearchQuery } from '@/Store/Redux/SliceStore';
import SearchIcon from '@mui/icons-material/Search';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
  const [query,setQuery]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const searchHandler=()=>{
      dispatch(setSearchQuery(query));
      navigate("/browse")
  }
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-4 rounded-full bg-gray-100 text-[#F83002] font-medium">No.1 Job Hunt Website</span>
        <h1 className="text-5xl font-bold">Search, Apply &<br/> Get Your<span className="text-[#6A38C2]">Dream Jobs</span></h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem</p>
          <div className="flex w-[40%] items-center mx-auto"  style={{backgroundColor:"white"}}>
           <input type="text" placeholder="Find your dream jobs"
            className="outline-none border-none w-full"
            onChange={(e)=>setQuery(e.target.value)} 
           />
           <span style={{marginBottom:"15px"}}><Button onClick={searchHandler} className='rounded-r-full p-4 h-13 bg-[#6A38C2]'><SearchIcon /></Button></span>
          </div>
      </div>
    </div>
  );
}; 

export default HeroSection;
