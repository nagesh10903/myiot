
const basecontroler=require("../basecontroler");
const locationService=require("../../services/location");
const {pageResponse,pageRedirect}=require("../../lib/ctrlResponse")
var mode="list";
var byuser="";
class locationctl extends basecontroler{
    constructor(locationService){
       super(locationService);
       this.svr=locationService;
     }
   
  getById(req,res){
     mode=(req.route.path.startsWith('/edit'))?'edit':(req.route.path.startsWith('/add'))?'add':'view';
  
    locationService.getById(req.params.id,(err,result)=>{
        if(mode==='add')result={rowid:""};
        if(mode==='view'){
            pageResponse(err,result,res,'./UI/location/viewlocation',{mode:mode,urlRoute:"locations",action:'delete'});            
        }
        else pageResponse(err,result,res,'./UI/location/editlocation',{mode:mode,urlRoute:"locations",action:mode});            
    
        });
    }


    getByIdAdd(req,res){
        mode="add";
        var pageData={mode:'add',urlRoute:"locations",action:'add'}
        res.render('./UI/location/editlocation',{result:{},pageData})  
        }

 getAll(req,res){
    var adminid=(req.user.usertype==='ADMIN')?req.user.rowid:req.user.adminid;    
  var   byuser={referenceid:adminid};
    locationService.ListAllFilter(byuser,(err,result) => {
        pageResponse(err,result,res,'./UI/common/UIlist',{pTitle:'Locations',urlRoute:'locations'});    
    });
 }

 getByName(req,res){
    locationService.getByName(req.params.name,(err,result) => {
        pageRedirect(err,result,res,'/locations');      
    });
 } 

 add(req,res){
    var newrow=req.body;
    if(req.user.usertype==='ADMIN')newrow.referenceid=req.user.rowid;
    else newrow.referenceid=req.user.adminid;
    newrow.created_by=req.user.username;
    newrow.updated_by=req.user.username;
    newrow.updated_dt=new Date().toISOString().replace('T', ' ').substr(0, 19);
    newrow.created_dt= newrow.updated_dt;
    locationService.addRow(newrow,(err,result) => {
        pageRedirect(err,result,res,'/locations');         
    });
 } 

 update(req,res){
    var rowid=(req.body.rowid!==null)?req.body.rowid:req.params.id;    
    if(rowid===null || rowid==='')pageResponse(null,0,res);
    else {
        var newrow=req.body;
        newrow.updated_by=req.user.username;
        newrow.updated_dt=new Date().toISOString().replace('T', ' ').substr(0, 19);
        locationService.updateRow(rowid,newrow,(err,result) => {
             pageRedirect(err,result,res,'/locations');         
         });
      }
    
 } 
 remove(req,res){
    var rowid=(req.body.rowid!==null)?req.body.rowid:req.params.id;     
    if(rowid===null || rowid==='')pageResponse(null,0,res);
    else{
        locationService.deleteRowId(rowid,(err,result) => {
           pageRedirect(err,result,res,'/locations');      
        });
   }
 } 
 getLocDevice(req,res){
    locationService.getLocDevice(req.params.id,(err,result)=>{
        pageResponse(err,result,res);            
        });
    }

 getAllDevices(req,res){
    locationService.getAllDevices((err,result) => {
        pageResponse(err,result,res);
    });
 }

}
module.exports=new locationctl(locationService);