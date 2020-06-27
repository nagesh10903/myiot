const router=require("express").Router();
const homectl=require("../../controlers/UI/homectl");

router.get("/",homectl.getPublicIp);
//router.get("/",homectl.getDashboard);

module.exports=router;