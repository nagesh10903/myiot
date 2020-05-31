const router=require("express").Router();
const groupctl=require("../../controlers/api/groupctl")

router.get("/",groupctl.getAll);
router.get("/:id",groupctl.getById);
router.delete("/:rowid",groupctl.remove);
router.delete("/",groupctl.remove);
router.post("/",groupctl.add);
router.put("/:rowid",groupctl.update);
router.put("/",groupctl.update);

module.exports=router;
