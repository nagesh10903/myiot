const basecontroler=require("../basecontroler");
const devicedetService=require("../../services/devicedetails");
const daytalogService=require("../../services/datalog");
const {pageResponse,pageRedirect}=require("../../lib/ctrlResponse")
var mode="list";
var byuser="";
class homectl extends basecontroler{
    constructor(devicedetService){
       super(devicedetService);
       this.svr=devicedetService;
     }
  
    getPublicIp(req,res)
    {
      var adminid=(req.user.usertype==='ADMIN')?req.user.rowid:req.user.adminid;    
      var  byuser={referenceid:adminid}; 
      var homeurl='#';
      devicedetService.getPublicIp(byuser,(err,result)=>{
          if(result!==null && !err)
          {
              homeurl="http://"+result.ip+":"+result.value_a+"/";
          }
          pageResponse(err,result,res,'./UI/home',{pTitle:'Home',homeUrl:homeurl}); 
         // sendResponse(err,result,res);        
       });  
    }

    getDashboard(req,res)
    {
    //  var adminid=(req.user.usertype==='ADMIN')?req.user.rowid:req.user.adminid;    
    //  var  byuser={userid:adminid,name:'BME280'};
     var  byuser={name:'BME280'};
     var temp={};
     var humid={};
     var latest={};
     var readingscount=(req.query.readingsCount)?parseInt(req.query.readingsCount):20;
      daytalogService.FilterSensorData(byuser,readingscount,(err,result)=>{   
        daytalogService.getAgg(result,temp,humid,latest);    
           pageResponse(err,result,res,'./UI/dashboard',{pTitle:'Dashboard',temp,humid,latest});        
       });
  
    }



}
module.exports=new homectl(devicedetService);