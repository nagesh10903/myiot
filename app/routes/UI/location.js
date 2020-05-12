const router=require("express").Router();
const locationctl=require("../../controlers/UI/locationctl")

router.get("/",locationctl.getAll);
router.get("/view/:id",locationctl.getById);
router.get("/add",locationctl.getByIdAdd);
router.get("/edit/:id",locationctl.getById);


router.post("/add",locationctl.add); 
router.post("/edit",locationctl.update); 
router.post("/delete",locationctl.remove);

/*
router.get("/devices",locationctl.getAllDevices);
router.get("/devices/:id",locationctl.getLocDevice);


*/
module.exports=router;
