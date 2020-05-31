const baseservice=require("./baseservice");
const dbmodels=require("../models/db")

class deviceposition extends baseservice
{
 constructor(model){
     super(model);
  }
  getDevicePosByLocId(locid,callback){
   this.model.findAll({where:{locationid:locid}})
   .then(this.errcheck(tbl,error));
    }


 
}
module.exports=new deviceposition(dbmodels.deviceposition);