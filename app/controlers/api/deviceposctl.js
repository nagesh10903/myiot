
const basecontroler=require("../basecontroler");
const deviceposService=require("../../services/deviceposition");
const {sendResponse}=require("../../lib/ctrlResponse")
class devicelocctl extends basecontroler{
    constructor(deviceposService){
       super(deviceposService);
       this.svr=deviceposService;
     }
   
  getById(req,res){
    deviceposService.getById(req.params.id,(err,result)=>{
            sendResponse(err,result,res);            
        });
    }

 getAll(req,res){
    deviceposService.getAll((err,result) => {
        sendResponse(err,result,res);
    });
 }

 getByName(req,res){
    deviceposService.getByName(req.params.name,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 

 add(req,res){
    deviceposService.addRow(req.body,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 

 update(req,res){
     var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
     if(!rowid)sendResponse(null,0,res);
     else {
        deviceposService.updateRow(rowid,req.body,(err,result) => {
             sendResponse(err,result,res);      
         });
      }
 } 
 
 remove(req,res){
    var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
    if(!rowid)sendResponse(null,0,res);
    else {
        deviceposService.deleteRowId(rowid,(err,result) => {
             sendResponse(err,result,res);
         });
    }
 } 
}
module.exports=new devicelocctl(deviceposService);