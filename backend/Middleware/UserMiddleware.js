const jwt=require("jsonwebtoken");
const UserModel=require("../Models/UserModel");

const UserMiddleware=async(req,res,next)=>{
     const token=req.header("Authorization");
     if(!token){
        return res.json({
            message:"Token is not provided",
        })
     }
     const jwtToken=await token.replace("Bearer ","").trim();
     try {
          const isVerified=jwt.verify(jwtToken,process.env.SECRET_KEY);
          const UserData=await UserModel.findOne({email:isVerified.email},{password:0});

          req.user=UserData,
          req.token=token,
         //  req.userId=UserData.userID
          req.id=UserData._id;
 
          next();
     } catch (error) {
        console.log(error);
     }
}
module.exports=UserMiddleware;