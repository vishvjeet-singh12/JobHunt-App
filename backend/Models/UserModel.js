const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const UserSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student','recuriter'],
        required:true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:"Company"},
        profilePhoto:{
            type:String,
            default:""
        }
    }
},{timestamps:true});

UserSchema.pre("save",async function(next){
     const user=this;
     if(!user.isModified("password")){
        next();
     }
     try {
        const saltRound=10;
        const hash_password=await bcrypt.hash(user.password,saltRound);
        user.password=hash_password;
     } catch (error) {
        console.log(error);
     }
});

UserSchema.methods.generateToken=async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email: this.email
        },
        process.env.SECRET_KEY,
        {
            "expiresIn":"10d"
        }
    )
    } catch (error) {
        console.log(error);
    }
}
const UserModel=mongoose.model("User",UserSchema);
module.exports=UserModel;