const router=require("express").Router();
const usrdevctl=require("../../controlers/api/userdevctl")

router.get("/",usrdevctl.getAll);
router.get("/users",usrdevctl.getAllDevByUserId);
router.get("/:id",usrdevctl.getById);
router.get("/user/:id",usrdevctl.getDevByUserId);
router.delete("/:rowid",usrdevctl.remove);
router.delete("/",usrdevctl.remove);
router.post("/",usrdevctl.add);
router.put("/:rowid",usrdevctl.update);
router.put("/",usrdevctl.update);

module.exports=router;
