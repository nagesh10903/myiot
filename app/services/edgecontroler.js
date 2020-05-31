const baseservice=require("./baseservice");
const dbmodels=require("../models/db")

class edgecontroler extends baseservice
{
 constructor(model){
     super(model);
  }
  getCOntrolerByName(name,callback){
   this.model.findAll({where:{name:name}})
     .then(this.errcheck(tbl,error));
    }

    getDetails(byoptions,callback)
    {

      this.model.findOne({where:byoptions,raw:true,
        attributes:{exclude:['created_dt','updated_dt','updated_by','created_by','version','status']},           
            include:[{model:dbmodels.devicedetails,
            attributes:['rowid','devicename','devicetype','tech_name','tech_model','devicemode']
            }]        
          })
          .then((tbl,error)=>{
            this.errcheck(tbl,error,callback);              
        });
    }

 
}
module.exports=new edgecontroler(dbmodels.edgecontrolers);