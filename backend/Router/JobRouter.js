const express=require("express");
const router=express.Router();
const UserMiddleware=require("../Middleware/UserMiddleware");
const JobContoller=require("../controller/JobController");

router.post("/postJobs",UserMiddleware,JobContoller.PostJob);
router.get("/getAllJobs",UserMiddleware,JobContoller.getAllJobs);
router.get("/getJobBy/:id",UserMiddleware,JobContoller.getJobById);
router.get("/getAdminJob",UserMiddleware,JobContoller.getAdminJobs);

module.exports=router;