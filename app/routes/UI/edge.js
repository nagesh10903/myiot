const router=require("express").Router();
const edgectl=require("../../controlers/UI/edgecontrolerctl")

router.get("/",edgectl.getAll);
router.get("/add",edgectl.getByIdAdd);
router.get("/view/:id",edgectl.getById);
router.get("/edit/:id",edgectl.getById);

router.post("/delete",edgectl.remove);
router.post("/edit",edgectl.update);
router.post("/add",edgectl.add);
router.post("/delete/:rowid",edgectl.remove);



module.exports=router;
