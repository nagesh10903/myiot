const router=require("express").Router();
const usrdevctl=require("../../controlers/UI/userdevctl")

router.get("/",usrdevctl.getAll);
//router.get("/add",usrdevctl.getById);
router.get("/view/:id",usrdevctl.getById);

router.post("/add",usrdevctl.add); 
router.post("/delete",usrdevctl.detach);

module.exports=router; 
