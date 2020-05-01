
const basecontroler=require("../basecontroler");
const userService=require("../../services/user");
const {pageResponse}=require("../../lib/ctrlResponse")
class userctl extends basecontroler{
    constructor(userService){
       super(userService);
       this.svr=userService;
     }
   
  getById(req,res){
        userService.getById(req.params.id,(err,result)=>{
            pageResponse(err,result,res,'./UI/users/user');            
        });
    }

 getAll(req,res){
    userService.ListAll((err,result) => {
        pageResponse(err,result,res,'./UI/common/UIlist',{pTitle:'User',urlRoute:'user',user:req.user});        
    });
 }


 add(req,res){
    userService.addRow(req.body,(err,result) => {
        pageResponse(err,result,res);       
    });
 } 

 update(req,res){
     var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
     if(!rowid)pageResponse(null,0,res);
     else {
         userService.updateRow(rowid,req.body,(err,result) => {
            pageResponse(err,result,res);      
         });
      }
 } 
 remove(req,res){
    var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
    if(!rowid)pageResponse(null,0,res);
    else {
         userService.deleteRowId(rowid,(err,result) => {
            pageResponse(err,result,res);
         });
    }
 } 
   
 getAllDevices(req,res){
    userService.getAllUserDevices((err,result)=>{
        pageResponse(err,result,res);            
    });
}
   
getDevices(req,res){
    userService.getUserDevices(req.params.id,(err,result)=>{
        pageResponse(err,result,res);            
    });
}
getAllLocations(req,res){
    userService.getAllLocation((err,result)=>{
        pageResponse(err,result,res);            
    });
}
   
getUserLocation(req,res){
    userService.getUserLocation(req.params.id,(err,result)=>{
        pageResponse(err,result,res);            
    });
}


}
module.exports=new userctl(userService);