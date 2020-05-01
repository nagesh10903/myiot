
const basecontroler=require("../basecontroler");
const edgeService=require("../../services/edgecontroler");
const {sendResponse}=require("../../lib/ctrlResponse")
class edgectl extends basecontroler{
    constructor(edgeService){
       super(edgeService);
       this.svr=edgeService;
     }
   
  getById(req,res){
    edgeService.getById(req.params.id,(err,result)=>{
            sendResponse(err,result,res);            
        });
    }

 getAll(req,res){
    edgeService.getAll((err,result) => {
        sendResponse(err,result,res);
    });
 }

 getByName(req,res){
    edgeService.getByName(req.params.name,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 

 add(req,res){
    edgeService.addRow(req.body,(err,result) => {
        sendResponse(err,result,res);       
    });
 } 

 update(req,res){
     var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
     if(!rowid)sendResponse(null,0,res);
     else {
        edgeService.updateRow(rowid,req.body,(err,result) => {
             sendResponse(err,result,res);      
         });
      }
 } 
 remove(req,res){
    var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
    if(!rowid)sendResponse(null,0,res);
    else {
        edgeService.deleteRowId(rowid,(err,result) => {
             sendResponse(err,result,res);
         });
    }
 } 
}
module.exports=new edgectl(edgeService);