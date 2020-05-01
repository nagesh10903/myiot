const router=require("express").Router();
const locationctl=require("../../controlers/api/locationctl")

router.get("/",locationctl.getAll);
router.get("/devices",locationctl.getAllDevices);
router.get("/:id",locationctl.getById);
router.get("/devices/:id",locationctl.getLocDevice);

router.delete("/:rowid",locationctl.remove);
router.delete("/",locationctl.remove);
router.post("/",locationctl.add);
router.put("/:rowid",locationctl.update);
router.put("/",locationctl.update);

module.exports=router;
