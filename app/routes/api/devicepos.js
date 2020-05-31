const router=require("express").Router();
const deviceposctl=require("../../controlers/api/deviceposctl")

router.get("/",deviceposctl.getAll);
router.get("/:id",deviceposctl.getById);
router.delete("/:rowid",deviceposctl.remove);
router.delete("/",deviceposctl.remove);
router.post("/",deviceposctl.add);
router.put("/:rowid",deviceposctl.update);
router.put("/",deviceposctl.update);

module.exports=router;
