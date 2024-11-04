const express=require("express");
const router=express.Router();
const UserContoller=require("../controller/UserController");
const UserMiddleware=require("../Middleware/UserMiddleware");
const upload=require("../Middleware/multer");

router.post("/userRegisteration",upload,UserContoller.Register);
router.post("/portalLogin",UserContoller.Login);
router.get("/portalUser",UserMiddleware,UserContoller.User);
router.patch("/profile/update",UserMiddleware,upload,UserContoller.UpdateData);



module.exports=router;