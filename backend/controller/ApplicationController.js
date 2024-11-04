const ApplicationModel=require("../Models/ApplicationModel");
const JobModel=require("../Models/JobModels");
const applyJob=async(req,res)=>{
   try {
    const userId=req.id;
    const jobId=req.params.id;
   const existingApplication=await ApplicationModel.findOne({job:jobId,applicant:userId});
    if(existingApplication){
        return res.json({
            message:"You have already applied for this job"
        })
    }
     const job=await JobModel.findOne({_id:jobId});
       if(!job){
        return res.json({
            message:"Job not found"
        })
       }
       const newApplication=await ApplicationModel.create({
        job:jobId,
        applicant:userId
       })

       job.applications.push(newApplication._id);
       await job.save();
       return res.json({
        message:"Job Applied Successfully"
       })
   } catch (error) {
    console.log(error);
   }
}

const getAppliedJobs=async(req,res)=>{
    try {
        const userId=req.id;
        const application=await ApplicationModel.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        })
        if(!application){
            return res.json({
                message:"No Application"
            })
        }
        return res.json({
            application
        })
    } catch (error) {
        console.log(error);
    }
}

//admin dekhega kitne user applied kre hai//
const getApplicant=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await JobModel.findOne({_id:jobId}).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        })
           if(!job){
            return res.json({
                message:"Job Not Found"
            })
           }
           return res.json({
            message:"Applied for Job",
            job
           })
    } catch (error) {
        console.log(error);
    }
}

const updateStatus=async(req,res)=>{
    try {
         const {status}=req.body;
         const applicationId=req.params.id;

         //find the application by applicant id
             const application=await ApplicationModel.findOne({_id:applicationId});
             if(!application){
                return res.json({
                    message:"Application not found"
                })
             }

             //update status
             application.status=status.toLowerCase();
             await application.save();
             return res.json({
                message:"Status Updated Successfully"
             })
        } catch (error) {
        console.log(error);
    }
}

module.exports={applyJob,getAppliedJobs,getApplicant,updateStatus}