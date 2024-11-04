const JobModel=require("../Models/JobModels");
const PostJob=async(req,res)=>{
    try {
       const {title,description,requirements,salary,experienceLevel,location,jobType,position,companyId}=req.body;
         const userId=req.id;
       const job=await JobModel.create({
        title,
        description,
        requirements:requirements.split(","),
        salary,
        experienceLevel,
        location,
        jobType,
        position,
        company:companyId,
        createdBy:userId
       })
       res.json({
        message:"New job is created",
        data:job
       })
    } catch (error) {
        console.log(error);
    }
}

const getAllJobs=async(req,res)=>{
 try {
    const keyword=req.query.keyword || '';
    const query={
        $or:[
            {title:{$regex:keyword,$options:"i"}},
            {description:{$regex:keyword,$options:"i"}}
        ]
    };
   const jobs=await JobModel.find(query).populate({
    path:'company'
   }).sort({createdAt:-1});
      if(!jobs){
        return res.json({
            message:"Job is not found"
        })
      }
      return res.json({
        message:"Jobs",
        data:jobs
      })
 } catch (error) {
    console.log(error);
 }
}

const getJobById=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await JobModel.findOne({_id:jobId}).populate({
            path:"applications"
        });
        if(!job){
            res.json({
                message:"Job is not found"
            })
        }
        return res.json({
            message:"Jobs",
            data:job
        })
    } catch (error) {
        console.log(error);
    }
}

///admin ne kitne job create kiye hai abhi tak
const getAdminJobs=async(req,res)=>{
    try {
         const adminId=req.id;
         const jobs=await JobModel.find({createdBy:adminId}).populate({
            path:'company',
            createdAt:-1
         });
         if(!jobs){
            return res.json({
                message:"Jobs Not Found",
            })
         }
           return res.json({
            message:"All Jobs",
            data:jobs
           })
    } catch (error) {
        console.log(error);
    }
}

module.exports={PostJob,getAllJobs,getJobById,getAdminJobs}