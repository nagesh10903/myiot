
const basecontroler=require("../basecontroler");
const userService=require("../../services/user");
const locationService=require("../../services/location");
const bcrypt=require("bcrypt");
const saltRounds=10;
const {pageResponse,pageRedirect,sendJson}=require("../../lib/ctrlResponse")
const Op = require('sequelize').Op;
var mode="list";
var byuser="";
class userctl extends basecontroler{
 
    constructor(userService){
       super(userService); 
       this.svr=userService;       
     }
   
  getById(req,res){
    var mode=(req.route.path.startsWith('/edit'))?'edit':(req.route.path.startsWith('/add'))?'add':'view';

    userService.getById(req.params.id,(err,result)=>{
        if(mode==='add')result={rowid:""};
        if(!err)req.flash('error',"No Locations for this user!")
            var byuser=(req.user.usertype==='ADMIN')?{referenceid:req.user.rowid}:{referenceid:req.user.adminid};
            locationService.ListAllFilter(byuser,(err,locs) => {  
                if(mode==='view'){
                    pageResponse(err,result,res,'./UI/users/viewuser',{mode:mode,urlRoute:"users",action:'delete',locations:locs});            
                }
                else pageResponse(err,result,res,'./UI/users/edituser',{mode:mode,urlRoute:"users",action:mode,locations:locs});            
            })    
    });
  }

    getByIdAdd(req,res){
        mode="add";
        var byuser=(req.user.usertype==='ADMIN')?{referenceid:req.user.rowid}:{referenceid:req.user.adminid};
        locationService.ListAllFilter(byuser,(err,locs) => {
            if(!err) req.flash('error',"No Locations for this user!")
           var pageData={mode:'add',urlRoute:"users",action:'add',locations:locs}
        res.render('./UI/users/edituser',{result:{},pageData})             
        }) 
        }
        
    chagePassword(req,res){
        mode="chpwd";
        var pageData={mode:mode,urlRoute:"users",action:'edit'}
        res.render('./UI/users/editpassword',{result:{},pageData})  
    }
 getAll(req,res){
    var byuser=(req.user.usertype==='ADMIN')?{[Op.or]:[{rowid:req.user.rowid},{adminid:req.user.rowid}]}:{[Op.or]:[{rowid:req.user.adminid},{adminid:req.user.adminid}]};
    userService.ListAllFilter(byuser,(err,result) => {
        pageResponse(err,result,res,'./UI/common/UIlist',{pTitle:'User',urlRoute:'users',btnConfig:true});        
    });
 }
 
 add(req,res){
     var newuser=req.body;
     if(newuser.usertype!=='ADMIN')newuser.adminid=req.user.rowid;
     
     newuser.password= bcrypt.hashSync(newuser.password,saltRounds);
     newuser.created_by=req.user.username;
     newuser.updated_by=req.user.username;
     newuser.updated_dt=new Date().toISOString().replace('T', ' ').substr(0, 19);
     newuser.created_dt= newuser.updated_dt;
     if(newuser.locationid==="")newuser.locationid=null;
    userService.addRow(newuser,(err,result) => {
        pageRedirect(err,result,res,'/users');       
    });
 } 


 update(req,res){
     var rowid=(req.body.rowid!==null)?req.body.rowid:req.params.id;    
     if(rowid===null || rowid==='')pageResponse(null,0,res);
     else {
        var newuser=req.body;       
         newuser.updated_by=req.user.username;
         newuser.updated_dt=new Date().toISOString().replace('T', ' ').substr(0, 19);
        if(newuser.locationid==="")newuser.locationid=null;
         userService.updateRow(rowid,newuser,(err,result) => {
            pageRedirect(err,result,res,'/users');      
         });
      }
 } 
 updatePassword(req,res){
    var rowid=(req.body.rowid!==null)?req.body.rowid:req.params.id;    
    if(rowid===null || rowid==='')pageResponse(null,0,res);
    else {
       var newuser=req.body;   
       userService.getById(newuser.rowid,(err,result)=>{
        if(!err && result!==null){
            if(bcrypt.compareSync(newuser.password,result.password)===true || newuser.password===result.password ){
             newuser.updated_by=req.user.username;
            newuser.updated_dt=new Date().toISOString().replace('T', ' ').substr(0, 19);
            newuser.password=bcrypt.hashSync(newuser.password1,saltRounds);
            userService.updateRow(rowid,newuser,(err,result) => {
               pageRedirect(err,result,res,'/users');      
            });
          } 
          else {
            req.flash("error","Try with Correct Old Password!")
            pageRedirect(err,result,res,'back'); 

          }         
                            
        }
       })
     } 
}
 remove(req,res){
    var rowid=(req.body.rowid!==null)?req.body.rowid:req.params.id;     
     if(rowid===null || rowid==='')pageResponse(null,0,res);
     else{
         userService.deleteRowId(rowid,(err,result) => {
            pageRedirect(err,result,res,'/users');      
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
getConfigJson(req,res){
    var byuser=(req.user.usertype==='ADMIN')?{[Op.or]:[{rowid:req.user.rowid},{adminid:req.user.rowid}]}:{[Op.or]:[{rowid:req.user.adminid},{adminid:req.user.adminid}]};
       userService.getConfigJson(byuser,(err,result) => {       
        sendJson(err,result,res,"user.json");            
    });
}

}

module.exports=new userctl(userService);