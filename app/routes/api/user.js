const router=require("express").Router();
const usrctl=require("../../controlers/api/userctl")

router.get("/",usrctl.getAll);
router.get("/devices",usrctl.getAllDevices);
router.get("/location",usrctl.getAllLocations);
router.get("/:id",usrctl.getById);
router.get("/email/:email",usrctl.getByEmailId);
router.get("/devices/:id",usrctl.getDevices);
router.get("/location/:id",usrctl.getUserLocation);


router.delete("/:rowid",usrctl.remove);
router.delete("/",usrctl.remove);
router.post("/",usrctl.add);
router.put("/:rowid",usrctl.update);
router.put("/",usrctl.update);

module.exports=router;
