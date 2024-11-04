const mongoose=require("mongoose");

const ApplicationSchema=new mongoose.Schema({
    job:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Job',
       required:true
    },
    applicant:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User',
       required:true
    },
    status:{
       type:String,
       enum:['pending','accepted','rejected'],
       default:'pending'
    }
},{timestamps:true});

const ApplicationModel=mongoose.model("Application",ApplicationSchema);
module.exports=ApplicationModel;
