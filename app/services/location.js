const baseservice=require("./baseservice");
const dbmodels=require("../models/db")

class location extends baseservice
{
 constructor(model){
     super(model);
  }
 
  getLocDevice(id,callback){
    this.model.findAll({where:{rowid:id},include:[{model:dbmodels.devicedetails}]})
    .then((tbl,error)=>{
        this.errcheck(tbl,error,callback); 
     })
    }

getAllDevices(callback){
    this.model.findAll({include:[{model:dbmodels.devicedetails}]})
    .then((tbl,error)=>{
        this.errcheck(tbl,error,callback); 
     })
    }
}
module.exports=new location(dbmodels.location);