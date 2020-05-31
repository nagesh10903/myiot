const router=require("express").Router();
const deviceposctl=require("../../controlers/UI/deviceposctl")

router.get("/",deviceposctl.getAll);
router.get("/view/:id",deviceposctl.getById);
router.get("/add",deviceposctl.getByIdAdd);
router.get("/new",deviceposctl.getByIdAdd); // modal from devices edit (id: devices edit id)
router.get("/edit/:id",deviceposctl.getById);


router.post("/add",deviceposctl.add); 
router.post("/edit",deviceposctl.update); 
router.post("/delete",deviceposctl.remove);
/*

*/
module.exports=router;
