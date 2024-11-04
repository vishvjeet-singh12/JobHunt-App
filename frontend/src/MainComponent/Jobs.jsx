import Navbar from "@/components/SharedNav/Navbar"
import Job from "./Job";
import FilterJobCard from "./FilterJobCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';


const Jobs = () => {
  const {allJobs,searchQuery}=useSelector((store)=>store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs || []);

  useEffect(() => {
    if (searchQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchQuery]);

  return (
    <div>
      <Navbar/>
      <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5">
        <div className="w-20%">
          <FilterJobCard />
        </div>
        {filterJobs && filterJobs.length > 0 ? (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="grid grid-cols-3 gap-4">
              {filterJobs.map((job) => (
                <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                key={job?._id}>
                <Job job={job} />
            </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <span>Job not found</span>
        )}
      </div>
    </div>
    </div>
  )
}

export default Jobs
