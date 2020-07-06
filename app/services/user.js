const baseservice=require("./baseservice");
const dbmodels=require("../models/db")
const { Op } = require("sequelize");

class user extends baseservice
{
 constructor(model){
     super(model);
  }
  checkUser(email,passwd,callback)
  {
    this.model.findAll({where:{[Op.and]:[{email:email},{password:passwd}]}})
    .then((tbl,error)=>{
        this.errcheck(tbl,error,callback); 
     })
  }

  getuserByUsername(username,callback){
    this.model.findOne({where:{username:username}})
    .then((tbl,error)=>{
     this.errcheck(tbl,error,callback); 
  })
     }

  getuserByEmail(email,callback){
   this.model.findOne({where:{email:email}})
   .then((tbl,error)=>{
    this.errcheck(tbl,error,callback); 
 })
    }
    getAllUserDevices(callback){
        this.model.findAll({include:[{model:dbmodels.devicedetails}
        ]
        })
        .then((tbl,error)=>{
            this.errcheck(tbl,error,callback); 
         })
         }
    
    getUserDevices(id,callback){
            this.model.findAll({where:{rowid:id},include:[{model:dbmodels.devicedetails}]})
            .then((tbl,error)=>{
                this.errcheck(tbl,error,callback); 
             })
            }

    getUserLocation(id,callback){
        this.model.findAll({where:{rowid:id},include:[{model:dbmodels.location}]})
        .then((tbl,error)=>{
            this.errcheck(tbl,error,callback); 
         })
        }

    getAllLocation(callback){
        this.model.findAll({include:[{model:dbmodels.location}]})
        .then((tbl,error)=>{
            this.errcheck(tbl,error,callback); 
         })
        }
    getConfigJson(byuser,callback){
      this.model.findAll({where:byuser,attributes:[['rowid','id'],'username','fname','lname','password',['usertype','role'],['usercategory','category'],'adminid']
        ,raw:true})
       .then((tbl,error)=>{
      this.errcheck(tbl,error,callback);              
      });
   }
}
module.exports=new user(dbmodels.user);