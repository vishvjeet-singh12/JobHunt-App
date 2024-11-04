const UserModel = require("../Models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/dataUri.js");
const cloudinary = require("../utils/cloudinary.js");
const Register = async (req, res) => {
  try {
    const { fullname, email, password, mobile, role } = req.body;
    // File path
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.json({
        message: "User already exist",
      });
    }
    const user = await UserModel.create({
      fullname,
      email,
      password,
      mobile,
      role,
    profile:{
                profilePhoto:cloudResponse.secure_url,
            }
    });
    res.json({
      message: "Registered Successfully!!",
      data: user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.json({
        message: "Something is missing",
      });
    }
    let userExist = await UserModel.findOne({ email });
    if (!userExist) {
      return res.json({
        message: "User is not exist",
        success: false,
      });
    }
    const user = await bcrypt.compare(password, userExist.password);
    if (role != userExist.role) {
      return res.json({
        message: "Account doesn't exist with current role",
        success: false,
      });
    }
    if (user) {
      res.json({
        message: "Successfully Loggedin!!",
        token: await userExist.generateToken(),
        userID: userExist._id.toString(),
        data: userExist,
      });
      console.log("User is matched");
    } else {
      res.json({
        message: "Invalid Email or Password",
      });
      console.log("User is not matched");
    }
  } catch (error) {
    console.log(error);
  }
};

const User = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      message: "User",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

//  const Logout=async(req,res)=>{
//   try {
//     return res.status(200).cookie("token","",{maxAge:0}).json({
//       message:"Logged out successfully",
//       success:true
//     })
//   } catch (error) {
//     console.log(error);
//   }
//  }

const UpdateData = async (req, res) => {
  try {
    const id = req.id;
    const { fullname, email, mobile, bio, skills } = req.body;
    
    const file = req.file;
    // cloudinary ayega idhar
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


    let skillsArray = [];
    if (skills) {
      skillsArray = skills.split(","); // Split the comma-separated string into an array
    }
    const UserData = {
      fullname,
      email,
      mobile,
      "profile.bio": bio,
      "profile.skills": skillsArray,
    };
    ///for resume upload
    if (cloudResponse) {
      UserData["profile.resume"] = cloudResponse.secure_url;
      UserData["profile.resumeOriginalName"] = file.originalname;
    }

    const UpdatedData = await UserModel.updateOne(
      { _id: id },
      { $set: UserData }
    );
    res.json({
      message: "Successfully Data Updated!!",
      data: UpdatedData,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { Register, Login, User, UpdateData };
