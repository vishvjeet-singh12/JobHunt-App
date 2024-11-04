const mongoose=require("mongoose");
 const URI=process.env.MONGODB_URI;

 const Database=()=>{
    mongoose.connect(URI).then(()=>{
        console.log("Database is connected");
    }).catch((err)=>{
        console.log(err)
    })
 }
 module.exports=Database; 