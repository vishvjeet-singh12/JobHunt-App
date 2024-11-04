const mongoose=require("mongoose");

const CompanySchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Company name is required"],
        unique:true
    },
    description:{
        type:String,
    },
    website:{
        type:String,
    },  
    location:{
        type:String,
        default:""
    },
    logo:{
        type:String  //Url to company logo
    },
    userId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User",
       required:true
    }
},{timestamps:true})

const CompanyModel=mongoose.model("Company",CompanySchema);
module.exports=CompanyModel;