
const basecontroler=require("../basecontroler");
const groupService=require("../../services/group");
const {sendResponse}=require("../../lib/ctrlResponse")
class groupctl extends basecontroler{
    constructor(groupService){
       super(groupService);
       this.svr=groupService;
     }
   
  getById(req,res){
    groupService.getById(req.params.id,(err,result)=>{
            sendResponse(err,result,res);            
        });
    }

 getAll(req,res){
    groupService.getAll((err,result) => {
        sendResponse(err,result,res);
    });
 }

 getByName(req,res){
    groupService.getByName(req.params.name,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 

 add(req,res){
    groupService.addRow(req.body,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 

 update(req,res){
     var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
     if(!rowid)sendResponse(null,0,res);
     else {
        groupService.updateRow(rowid,req.body,(err,result) => {
             sendResponse(err,result,res);      
         });
      }
 } 
 remove(req,res){
    var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
    if(!rowid)sendResponse(null,0,res);
    else {
        groupService.deleteRowId(rowid,(err,result) => {
             sendResponse(err,result,res);
         });
    }
 } 
}
module.exports=new groupctl(groupService);