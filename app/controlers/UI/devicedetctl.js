
const basecontroler=require("../basecontroler");
const devicedetService=require("../../services/devicedetails");
const {pageResponse}=require("../../lib/ctrlResponse")
class devicedetctl extends basecontroler{
    constructor(devicedetService){
       super(devicedetService);
       this.svr=devicedetService;
     }
   
  getById(req,res){
    devicedetService.getById(req.params.id,(err,result)=>{
        pageResponse(err,result,res,'./UI/devices/device');            
        });
    }

 getAll(req,res){
    devicedetService.ListAll((err,result) => {
        pageResponse(err,result,res,'./UI/common/UIlist',{pTitle:'Devices',urlRoute:'devices'});
    });
 }

 getByName(req,res){
    devicedetService.getByName(req.params.name,(err,result) => {
        pageResponse(err,result,res,'');       
    });
 } 

 add(req,res){
    devicedetService.addRow(req.body,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 

 update(req,res){
     var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
     if(!rowid)sendResponse(null,0,res);
     else {
        devicedetService.updateRow(rowid,req.body,(err,result) => {
             sendResponse(err,result,res);      
         });
      }
 } 
 remove(req,res){
    var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
    if(!rowid)sendResponse(null,0,res);
    else {
        devicedetService.deleteRowId(rowid,(err,result) => {
             sendResponse(err,result,res);
         });
    }
 } 

 getEdgeDevice(req,res){
    devicedetService.getEdgeDevice(req.params.id,(err,result)=>{
            sendResponse(err,result,res);            
        });
    }

    getAllEdges(req,res){
        devicedetService.getAllEdges((err,result) => {
        sendResponse(err,result,res);
    });
 }
}
module.exports=new devicedetctl(devicedetService);