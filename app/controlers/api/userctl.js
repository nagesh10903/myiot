
const basecontroler=require("../basecontroler");
const userService=require("../../services/user");
const {sendResponse}=require("../../lib/ctrlResponse")
class userctl extends basecontroler{
    constructor(userService){
       super(userService);
       this.svr=userService;
     }
   
  getById(req,res){
        userService.getById(req.params.id,(err,result)=>{
            sendResponse(err,result,res);            
        });
    }

 getAll(req,res){
    userService.getAll((err,result) => {
        sendResponse(err,result,res);
    });
 }

 getByEmailId(req,res){
    userService.getByEmail(req.params.email,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 

 add(req,res){
    userService.addRow(req.body,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 

 update(req,res){
     var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
     if(!rowid)sendResponse(null,0,res);
     else {
         userService.updateRow(rowid,req.body,(err,result) => {
             sendResponse(err,result,res);      
         });
      }
 } 
 remove(req,res){
    var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
    if(!rowid)sendResponse(null,0,res);
    else {
         userService.deleteRowId(rowid,(err,result) => {
             sendResponse(err,result,res);
         });
    }
 } 
   
 getAllDevices(req,res){
    userService.getAllUserDevices((err,result)=>{
        sendResponse(err,result,res);            
    });
}
   
getDevices(req,res){
    userService.getUserDevices(req.params.id,(err,result)=>{
        sendResponse(err,result,res);            
    });
}
getAllLocations(req,res){
    userService.getAllLocation((err,result)=>{
        sendResponse(err,result,res);            
    });
}
   
getUserLocation(req,res){
    userService.getUserLocation(req.params.id,(err,result)=>{
        sendResponse(err,result,res);            
    });
}


}
module.exports=new userctl(userService);