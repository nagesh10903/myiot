
const basecontroler=require("../basecontroler");
const datalogService=require("../../services/datalog");
const {sendResponse}=require("../../lib/ctrlResponse")
class datalogctl extends basecontroler{
    constructor(datalogService){
       super(datalogService);
       this.svr=datalogService;
     }
   
  getById(req,res){
    datalogService.getById(req.params.id,(err,result)=>{
            sendResponse(err,result,res);            
        });
    }

 getAll(req,res){
    datalogService.getAll((err,result) => {
        sendResponse(err,result,res);
    });
 }

 getByName(req,res){
    datalogService.getByName(req.params.name,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 

 addDeviceData(req,res){
     var data=req.body;
     data.userid=req.user.rowid;
    datalogService.addDeviceData(data,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 
 addSensorData(req,res){
    var data=req.body;
    data.userid=req.user.rowid;
    datalogService.addSensorData(data,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 

 FilterDeviceData(req,res){
    var byuser={userid:req.user.rowid,device_type:'DEVICVE'};
    datalogService.FilterDeviceData(byuser,(err,result) => {
        sendResponse(err,result,res);
    });
 }
 
 FilterSensorData(req,res){
    datalogService.FilterSensorData((err,result) => {
        sendResponse(err,result,res);
    });
 }

 getDeviceLabel(req,res){
     var bydevice={userid:req.user.rowid,deviceid:req.params.id,device_type:'DEVICE',mode_control:'LABEL'};
    datalogService.getDeviceLabel(bydevice,(err,result) => {
        sendResponse(err,result,res);
    });
 }

 getUserLabel(req,res){
    var byuser={userid:req.user.rowid,device_type:'USER',mode_control:'LABEL'};
   datalogService.getUserLabel(byuser,(err,result) => {
       sendResponse(err,result,res);
   });
}

addDeviceLabel(req,res){
    var data=req.body;
    data.userid=req.user.rowid;
    datalogService.addDeviceLabel(data,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 

 addUserLabel(req,res){
    var data=req.body;
    data.userid=req.user.rowid;
    datalogService.addUserLabel(data,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 

}
module.exports=new datalogctl(datalogService);