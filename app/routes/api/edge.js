const router=require("express").Router();
const edgectl=require("../../controlers/api/edgecontrolerctl")

router.get("/",edgectl.getAll);
router.get("/:id",edgectl.getById);
router.delete("/:rowid",edgectl.remove);
router.delete("/",edgectl.remove);
router.post("/",edgectl.add);
router.put("/:rowid",edgectl.update);
router.put("/",edgectl.update);


module.exports=router;
