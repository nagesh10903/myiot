
const basecontroler=require("../basecontroler");
const userdevService=require("../../services/userdevices");
const {sendResponse}=require("../../lib/ctrlResponse")
class userdevctl extends basecontroler{
    constructor(userdevService){
       super(userdevService);
       this.svr=userdevService;
     }
   
  getById(req,res){
    userdevService.getById(req.params.id,(err,result)=>{
            sendResponse(err,result,res);            
        });
    }

 getAll(req,res){
    userdevService.getAll((err,result) => {
        sendResponse(err,result,res);
    });
 }


 add(req,res){
    userdevService.addRow(req.body,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 

 update(req,res){
     var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
     if(!rowid)sendResponse(null,0,res);
     else {
        userdevService.updateRow(rowid,req.body,(err,result) => {
             sendResponse(err,result,res);      
         });
      }
 } 
 remove(req,res){
    var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
    if(!rowid)sendResponse(null,0,res);
    else {
        userdevService.deleteRowId(rowid,(err,result) => {
             sendResponse(err,result,res);
         });
    }
 } 

 getDevByUserId(req,res){
    userdevService.getUserDetais(req.params.id,(err,result)=>{
            sendResponse(err,result,res);            
        });
    }

    getAllDevByUserId(req,res){
        userdevService.getAllUserDetais((err,result)=>{
                sendResponse(err,result,res);            
            });
        }
}
module.exports=new userdevctl(userdevService);