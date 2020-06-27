const router=require("express").Router();
const usrctl=require("../../controlers/UI/userctl")

router.get("/",usrctl.getAll);
router.get("/add",usrctl.getByIdAdd);
router.get("/config",usrctl.getConfigJson);
router.get("/view/:id",usrctl.getById);
router.get("/edit/:id",usrctl.getById); 
router.get("/chpwd/:id",usrctl.chagePassword);

router.post("/add",usrctl.add); 
router.post("/edit",usrctl.update); 
router.post("/chpwd",usrctl.updatePassword);
router.post("/delete",usrctl.remove);

/*
router.get("/devices",usrctl.getAllDevices);
router.get("/location",usrctl.getAllLocations);

router.get("/devices/:id",usrctl.getDevices);
router.get("/location/:id",usrctl.getUserLocation);

router.delete("/:rowid",usrctl.remove);
router.delete("/",usrctl.remove);

router.put("/:rowid",usrctl.update);
router.put("/",usrctl.update);
*/
module.exports=router;
