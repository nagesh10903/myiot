const basecontroler=require("../basecontroler");
const devicedetService=require("../../services/devicedetails");
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
}
module.exports=new homectl(devicedetService);