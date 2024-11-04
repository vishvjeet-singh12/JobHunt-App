require("dotenv").config();
const express=require("express");
const app=express();
const cookieparser=require("cookie-parser");
const cors=require("cors");
const Database=require("./Database");
const router=require("./Router/UserRouter");
const companyrouter=require("./Router/CompanyRouter")
const jobrouter=require("./Router/JobRouter");
const applicationrouter=require("./Router/ApplicationRouter");

//middleware//
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
const corsOptions={
    origin:"http://localhost:5173",
    method:"GET,POST,PATCH,DELETE,PUT",
    credentials:true
}
app.use(cors(corsOptions));
app.use("/api",router);
app.use("/company",companyrouter);
app.use("/job",jobrouter);
app.use("/application",applicationrouter);

Database();
const PORT=process.env.PORT;
app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`Server is run on ${PORT}`);
})