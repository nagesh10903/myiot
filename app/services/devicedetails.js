const baseservice=require("./baseservice");
const dbmodels=require("../models/db")
const Sequelize = require("sequelize");
class devicedetails extends baseservice
{
 constructor(model){
     super(model);
  }
  getDeviceByName(name,callback){
   this.model.findAll({where:{devicename:name}, raw:true})
   .then(errcheck(tbl,error));
    }

    getEdgeDevice(id,callback){
        this.model.findAll({where:{rowid:id},include:[{model:dbmodels.edgecontrolers}],
          raw:true })
        .then((tbl,error)=>{
            this.errcheck(tbl,error,callback); 
         })
        }

    ListEdgeDevice(id,callback){
        this.model.findAll({where:{rowid:id},
            attributes:{exclude:['created_dt','updated_dt','updated_by','created_by','version','status']},
            include:[{model:dbmodels.edgecontrolers}] , raw:true,nest: true})
        .then((tbl,error)=>{
            this.errcheck(tbl,error,callback); 
         })
        }
    
    getAllEdges(callback){
        this.model.findAll({include:[{model:dbmodels.edgecontrolers}], raw:true})
        .then((tbl,error)=>{
            this.errcheck(tbl,error,callback); 
         })
        }

    getConfigJson(byuser,callback)
    {
        this.model.findAll({where:byuser,
            attributes:[['rowid','deviceid'], [Sequelize.col('e.rowid'), 'controlerid'], [Sequelize.col('p.label'), 'room'],['devicename','name'],['tech_name','devicename1'],'value_a',['devicemode','mode'],'devicetype','interfaces','label',
                         [Sequelize.col('p.roomtype'), 'roomtype'], 
                        [Sequelize.col('e.name'), 'name'],  [Sequelize.col('e.tech_name'), 'devicename'],  [Sequelize.col('e.mode_control'), 'mode_control']  , [Sequelize.col('e.label'), 'labels']                       
                       ],
            include:[{model:dbmodels.edgecontrolers,as:'e',attributes:[]},
                     {model:dbmodels.deviceposition,as:'p',attributes:[]}
                    ], raw:true})
        .then((tbl,error)=>{

            this.errcheck(tbl,error,callback); 
         })
    }
    
}
module.exports=new devicedetails(dbmodels.devicedetails);