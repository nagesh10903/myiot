const router=require("express").Router();
const devdetctl=require("../../controlers/UI/devicedetctl")

router.get("/",devdetctl.getAll);
router.get("/:id",devdetctl.getById);

/*
router.get("/edges",devdetctl.getAllEdges);

router.get("/edges/:id",devdetctl.getEdgeDevice);

router.delete("/:rowid",devdetctl.remove);
router.delete("/",devdetctl.remove);
router.post("/",devdetctl.add);
router.put("/:rowid",devdetctl.update);
router.put("/",devdetctl.update);
*/
module.exports=router;
