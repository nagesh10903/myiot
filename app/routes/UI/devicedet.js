const router=require("express").Router();
const devdetctl=require("../../controlers/UI/devicedetctl")

router.get("/",devdetctl.getAll);
router.get("/add",devdetctl.getByIdAdd);
router.get("/config",devdetctl.getConfigJson);
router.get("/:id/edges",devdetctl.getEdgeDevice);
router.get("/view/:id",devdetctl.getById);
router.get("/edit/:id",devdetctl.getById);


router.post("/add",devdetctl.add); 
router.post("/edit",devdetctl.update); 
router.post("/delete",devdetctl.remove);


/*
router.get("/edges",devdetctl.getAllEdges);

router.get("/edges/:id",devdetctl.getEdgeDevice);


*/
module.exports=router; 
