const router=require("express").Router();
const datalogctl=require("../../controlers/api/datalogctl")

router.get("/",datalogctl.getAll);
router.get("/devices",datalogctl.FilterDeviceData);
router.get("/:name",datalogctl.getByName);
router.get("/sensors",datalogctl.FilterSensorData);
router.get("/devmsg",datalogctl.getDeviceLabel);
router.get("/msg",datalogctl.getUserLabel);

router.post("/device",datalogctl.addDeviceData);
router.post("/sensor",datalogctl.addSensorData);

router.post("/devmsg",datalogctl.addDeviceLabel);
router.post("/msg",datalogctl.addUserLabel);

module.exports=router;
