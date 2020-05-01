
const basecontroler=require("./basecontroler");
const userService=require("../services/user");
const {sendResponse}=require("../lib/ctrlResponse")
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

 getByName(req,res){
    userService.getByName(req.params.name,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 

 getByEmailId(req,res){
    userService.getuserByEmail(req.params.email,(err,result) => {
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
}
module.exports=new userctl(userService);