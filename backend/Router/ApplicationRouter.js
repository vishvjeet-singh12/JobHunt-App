const express=require("express");
const router=express.Router();
const UserMiddleware=require("../Middleware/UserMiddleware");
const ApplicationController=require("../controller/ApplicationController");

router.get("/applyJob/:id",UserMiddleware,ApplicationController.applyJob);
router.get("/getAppliedJob",UserMiddleware,ApplicationController.getAppliedJobs);
router.get("/getApplicants/:id",UserMiddleware,ApplicationController.getApplicant);
router.post("/updatestatus/:id",UserMiddleware,ApplicationController.updateStatus);

module.exports=router;