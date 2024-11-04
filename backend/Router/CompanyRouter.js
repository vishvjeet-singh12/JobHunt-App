const express=require("express");
const router=express.Router();
const CompanyController=require("../controller/CompanyController");
const UserMiddleware=require("../Middleware/UserMiddleware");
const upload=require("../Middleware/multer")

router.post("/companyRegisteration",UserMiddleware,CompanyController.registerCompany);
router.get("/getCompany",UserMiddleware,CompanyController.getCompany);
router.get("/getCompany/:id",UserMiddleware,CompanyController.getCompanyById);
router.patch("/updateCompany/:id",UserMiddleware,upload,CompanyController.updateCompany);


module.exports=router;