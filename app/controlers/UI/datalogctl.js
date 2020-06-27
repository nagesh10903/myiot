
const basecontroler=require("../basecontroler");
const daytalogService=require("../../services/datalog");
const {pageResponse,pageRedirect}=require("../../lib/ctrlResponse")
var mode="list";
var byuser="";
class datalogctl extends basecontroler{
    constructor(locationService){
       super(locationService);
       this.svr=locationService;
     }
   

 getAll(req,res){
    var adminid=(req.user.usertype==='ADMIN')?req.user.rowid:req.user.adminid;    
  var   byuser={referenceid:adminid};
  daytalogService.ListAllFilter(byuser,(err,result) => {
        pageResponse(err,result,res,'./UI/common/UIlist',{pTitle:'DataLog',urlRoute:'datalog'});    
    });
 }

 getByName(req,res){
    daytalogService.getByName(req.params.name,(err,result) => {
        pageResponse(err,result,res,'./UI/common/UIlist',{pTitle:'DataLog',urlRoute:'datalog'});    
    });
 } 

 FilterSensorData(req,res){
    daytalogService.FilterSensorData((err,result) => {
        pageResponse(err,result,res,'./UI/common/UIlist',{pTitle:'DataLog',urlRoute:'datalog'});    
    });
 }

 FilterDeviceData(req,res){
    daytalogService.FilterDeviceData((err,result) => {
        pageResponse(err,result,res,'./UI/common/UIlist',{pTitle:'DataLog',urlRoute:'datalog'});    
    });
 }

}
module.exports=new datalogctl(daytalogService);