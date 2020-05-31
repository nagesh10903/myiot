const router=require("express").Router();
const usrctl=require("../controlers/api/userctl")

router.get("/",usrctl.getAll);
router.get("/:id",usrctl.getById);
router.get("/email/:email",usrctl.getByEmailId);
router.delete("/:rowid",usrctl.remove);
router.delete("/",usrctl.remove);
router.post("/",usrctl.add);
router.put("/:rowid",usrctl.update);
router.put("/",usrctl.update);

module.exports=router;
