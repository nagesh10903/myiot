const baseservice=require("./baseservice");
const dbmodels=require("../models/db")
const { Op } = require("sequelize");

class datalog extends baseservice
{
 constructor(model){
     super(model);
  }

  getAgg(result,temp,humid,latest)
  { 
    latest.time=result[0].timestamp;
    latest.temp=result[0].Temp;
    latest.humid=result[0].Humidity;
    var count=0;
    temp.min=0.0;
    temp.max=0.0;
    humid.min=0.0;
    humid.max=0.0;
    result.forEach(ele => {
      temp.min=(temp.min<ele.Temp)?ele.Temp:temp.min;
      temp.max=(temp.max>ele.Temp)?ele.Temp:temp.max;
      humid.min=(humid.min<ele.Humidity)?ele.Humidity:humid.min;
      humid.max=(humid.max>ele.Humidity)?ele.Humidity:humid.max;
      temp.avg+=ele.Temp;
      humid.avg+=ele.Humidity;
      result[count].timestamp= result[count].timestamp.toISOString();
      count++;
      
    });
    temp.avg/=count;
    humid.avg/=count;
    latest.count=count;
  }

  FilterSensorData(byuser,limit,callback){
    this.model.findAll({where:byuser,attributes:[['rowid','Id'],'created_dt','name',['label','Location'],'device_type','mode_control',['value_i','Temp'],['value_j','Humidity'],'timestamp']            
            ,raw:true,limit:limit,order:['timestamp']})
    .then((tbl,error)=>{
      this.errcheck(tbl,error,callback);              
  });
  }

  FilterDeviceData(byuser,callback){
    this.model.findAll({where:byuser,attributes:
            {exclude:['updated_dt','updated_by','created_by','version','adminid','status','password','referenceid','controler']}
            ,raw:true})
    .then((tbl,error)=>{
      this.errcheck(tbl,error,callback);              
  });
  }
  addSensorData(data,callback)
  {
      data.device_type='SENSOR';
    this.model.create(data)
    .then((tbl,error)=>{
      this.errcheck(tbl,error,callback);   
    });  
  }
  addDeviceData(data,callback)
  {
    data.device_type='DEVICE';
    this.model.create(data)
    .then((tbl,error)=>{
      this.errcheck(tbl,error,callback);   
    });  
  }

  addDeviceLabel(data,callback)
  {
    data.device_type='DEVICE';
    data.mode_control='LABEL';
    this.model.create(data)
    .then((tbl,error)=>{
      this.errcheck(tbl,error,callback);   
    });  
  }
  addUserLabel(data,callback)
  {
    data.device_type='USER';
    data.mode_control='LABEL';
    this.model.create(data)
    .then((tbl,error)=>{
      this.errcheck(tbl,error,callback);   
    });  
  }

  getDeviceLabel(bydevice,callback){
    this.model.findAll({where:bydevice,attributes:[['rowid','Id'],'userid','created_dt','name',['label','Message'],'device_type','mode_control',['value_a','Message2'],['value_b','Message3']]            
    ,raw:true,limit:limit,order:['created_dt']})
   .then((tbl,error)=>{
   this.errcheck(tbl,error,callback);              
   });
  }
  
  getUserLabel(byuser,callback){
    this.model.findAll({where:byuser,attributes:[['rowid','Id'],'userid','created_dt','name',['label','Message'],'device_type','mode_control',['value_a','Message2'],['value_b','Message3']]            
    ,raw:true,limit:limit,order:['created_dt']})
   .then((tbl,error)=>{
   this.errcheck(tbl,error,callback);              
   });
  }
}
module.exports=new datalog(dbmodels.datalog);