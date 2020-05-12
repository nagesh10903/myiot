
const basecontroler=require("../basecontroler");
const userdevService=require("../../services/userdevices");
const devicedetService=require("../../services/devicedetails");
const userService=require("../../services/user");
const {pageResponse,pageRedirect,checkerror}=require("../../lib/ctrlResponse")
const Op = require('sequelize').Op;
var mode="list";
var byuser="";
class userdevctl extends basecontroler{
    constructor(userdevService){
       super(userdevService);
       this.svr=userdevService;
     }
   
  getById(req,res){
    userdevService.getById(req.params.id,(err,result)=>{
        pageResponse(err,result,res,'./UI/userdevice/UIlist',{pTitle:'User Devices',urlRoute:'userdev'});     
        });
    }

 getAll(req,res){
    var adminid=(req.user.usertype==='ADMIN')?req.user.rowid:req.user.adminid;    
    var byuser=(req.user.usertype==='ADMIN')?{[Op.or]:[{rowid:req.user.rowid},{adminid:req.user.rowid}]}:{[Op.or]:[{rowid:req.user.adminid},{adminid:req.user.adminid}]};

    if(req.user.usertype!=='ADMIN'){
        return  userdevService.getUserDevices({rowid:req.user.rowid},(err,result) => {
            pageResponse(err,result,res,'./UI/userdevice/UIlist',{pTitle:'User Devices',urlRoute:'userdev',users:[],devices:[]});
        });
    }
     else  userService.ListAllFilter(byuser,(err,users)=>{
        if(users.length===0 || err )
        {
            req.flash("error","No Users Found!")
            pageRedirect(err,1,res,'back');       
        }
        else {
            devicedetService.ListAllFilter({referenceid:adminid},(err,devices)=>{
              if(users.length===0 || err )
              {
                  req.flash("error","No Devises for the User Found!")
                  pageRedirect(err,1,res,'back');       
              }
              else{
                  //{[Op.or]:[{rowid:req.user.rowid},{adminid:req.user.rowid}]}
               // byuser={userid:adminid};
            userdevService.getUserDevices(byuser,(err,result) => {
                 pageResponse(err,result,res,'./UI/userdevice/UIlist',{pTitle:'User Devices',urlRoute:'userdev',users:users,devices:devices});
             });
           }
        })
      }
    });
 }

 add(req,res){
    var newrow=req.body;  
    if(newrow.userid==="" || newrow.deviceid==="") {
        req.flash("error","Userid/deviceid Not provided!")
                    pageRedirect(err,1,res,'back');       
    } 
    else{   
    newrow.updated_by=req.user.username;
     newrow.updated_dt=new Date().toISOString().replace('T', ' ').substr(0, 19);
    userdevService.getCount({[Op.and]:[{deviceid:newrow.deviceid},{userid:newrow.userid}]},(err,count)=>{
        if(count>0 || err){
            req.flash("error","Userid->Device Already Exists!")
                    pageRedirect(err,1,res,'back');       
            } 
     else{
         userdevService.addRow(req.body,(err,result) => {
            pageRedirect(err,result,res,'/userdev');    
         });
      }
   }); 
  }
 }
 
 attach(req,res){
     var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
     if(!rowid)sendResponse(null,0,res);
     else {
        userdevService.updateRow(rowid,req.body,(err,result) => {
            pageRedirect(err,result,res,'/userdev');       
         });
      }
 } 
 detach(req,res){
    var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
    if(!rowid)sendResponse(null,0,res);
    else {
        userdevService.deleteRowId(rowid,(err,result) => {
            pageRedirect(err,result,res,'/userdev');  
         });
    }
 } 

 getDevByUserId(req,res){
    userdevService.getUserDetais(req.params.id,(err,result)=>{
        pageResponse(err,result,res);            
        });
    }

    getAllDevByUserId(req,res){
        userdevService.getAllUserDetais((err,result)=>{
            pageResponse(err,result,res);            
            });
        }
}
module.exports=new userdevctl(userdevService);