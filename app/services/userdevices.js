const baseservice=require("./baseservice");
const dbmodels=require("../models/db")
const sequelize= require('sequelize');

class userdevices extends baseservice
{
 constructor(model){
     super(model);
  }
  getUserDetais(id,callback){
    dbmodels.userdevices.findAll({where:{userid:id},raw:true,
      attributes:["rowid","access_type"],
          include:[ {model:dbmodels.user, attributes:["username",'usertype','usercategory']},
             {model:dbmodels.devicedetails, attributes:["devicename",'devicetype','devicemode','tech_name']
                , include:[{model:dbmodels.edgecontrolers}]}            
          ]})
         .then((tbl,error)=>{
            this.errcheck(tbl,error,callback);                
        });
    }
 
    getAllUserDetais(callback){
        dbmodels.userdevices.findAll({
              include:[ {model:dbmodels.user},
                 {model:dbmodels.devicedetails
                    , include:[{model:dbmodels.edgecontrolers}]}            
              ],raw:true})
             .then((tbl,error)=>{
                this.errcheck(tbl,error,callback);                
            });
        }
   
        getUserDevices(byuser,callback){
         dbmodels.userdevices.findAll({raw:true,
            attributes:["rowid"],
                include:[ {model:dbmodels.user,where:byuser, attributes:["username",'usertype','usercategory']},
                   {model:dbmodels.devicedetails, attributes:["devicename",'devicetype','devicemode','tech_name']}                             
                ]})
               .then((tbl,error)=>{
                  this.errcheck(tbl,error,callback);                
              });
          }
      
}
module.exports=new userdevices(dbmodels.userdevices); 