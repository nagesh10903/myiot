
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
    datalogService.addDeviceData(req.body,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 
 addSensorData(req,res){
    datalogService.addSensorData(req.body,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 

 FilterDeviceData(req,res){
    datalogService.FilterDeviceData((err,result) => {
        sendResponse(err,result,res);
    });
 }
 
 FilterSensorData(req,res){
    datalogService.FilterSensorData((err,result) => {
        sendResponse(err,result,res);
    });
 }
}
module.exports=new datalogctl(datalogService);