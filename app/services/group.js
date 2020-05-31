const baseservice=require("./baseservice");
const dbmodels=require("../models/db")

class group extends baseservice
{
 constructor(model){
     super(model);
  }
  getGroupByName(name,callback){
   this.model.findAll({where:{name:name}})
   .then(errcheck(tbl,error));
    }
}
module.exports=new group(dbmodels.group);