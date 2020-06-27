const router=require("express").Router();
const datalogctl=require("../../controlers/UI/datalogctl")

router.get("/",datalogctl.getAll);
router.get("/devices",datalogctl.FilterDeviceData);
router.get("/:name",datalogctl.getByName);
router.get("/sensors",datalogctl.FilterSensorData);

module.exports=router;
