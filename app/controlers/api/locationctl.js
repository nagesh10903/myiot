
const basecontroler=require("../basecontroler");
const locationService=require("../../services/location");
const {sendResponse}=require("../../lib/ctrlResponse")
class locationctl extends basecontroler{
    constructor(locationService){
       super(locationService);
       this.svr=locationService;
     }
   
  getById(req,res){
    locationService.getById(req.params.id,(err,result)=>{
            sendResponse(err,result,res);            
        });
    }

 getAll(req,res){
    locationService.getAll((err,result) => {
        sendResponse(err,result,res);
    });
 }

 getByName(req,res){
    locationService.getByName(req.params.name,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 

 add(req,res){
    locationService.addRow(req.body,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 

 update(req,res){
     var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
     if(!rowid)sendResponse(null,0,res);
     else {
        locationService.updateRow(rowid,req.body,(err,result) => {
             sendResponse(err,result,res);      
         });
      }
 } 
 remove(req,res){
    var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
    if(!rowid)sendResponse(null,0,res);
    else {
        locationService.deleteRowId(rowid,(err,result) => {
             sendResponse(err,result,res);
         });
    }
 } 
 getLocDevice(req,res){
    locationService.getLocDevice(req.params.id,(err,result)=>{
            sendResponse(err,result,res);            
        });
    }

 getAllDevices(req,res){
    locationService.getAllDevices((err,result) => {
        sendResponse(err,result,res);
    });
 }

}
module.exports=new locationctl(locationService);