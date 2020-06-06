
const basecontroler=require("../basecontroler");
const devicedetService=require("../../services/devicedetails");
const userdeviceService=require("../../services/userdevices");
const edgedevices=require("../../services/edgecontroler");
const locationService=require("../../services/location");
const devicePosition=require("../../services/deviceposition");

const {pageResponse,pageRedirect,checkerror,sendJson}=require("../../lib/ctrlResponse")
const Op = require('sequelize').Op;
var mode="list";
var byuser="";
class devicedetctl extends basecontroler{
    constructor(devicedetService){
       super(devicedetService);
       this.svr=devicedetService;
     }
   
  getById(req,res){
    mode=(req.route.path.startsWith('/edit'))?'edit':(req.route.path.startsWith('/add'))?'add':'view';
  
    devicedetService.getById(req.params.id,(err,result)=>{
        if(mode==='add')result={rowid:""};
        var byuser=(req.user.usertype==='ADMIN')?{referenceid:req.user.rowid}:{referenceid:req.user.adminid};
        locationService.ListAllFilter(byuser,(err,locs) => {
            if(!err) req.flash('error',"No Locations for this user!")
        devicePosition.ListAllFilter(byuser,(err,devpos) => {
            if(!err) req.flash('error',"No Device Positions found!")
        if(mode==='view'){
            pageResponse(err,result,res,'./UI/devices/viewdevice',{mode:mode,urlRoute:"devices",action:'delete',locations:locs,deviceposition:devpos});            
        }
        else pageResponse(err,result,res,'./UI/devices/editdevice',{mode:mode,urlRoute:"devices",action:mode,locations:locs,deviceposition:devpos});            
        })
        })
      });
    }


    getByIdAdd(req,res){
        mode="add";
        var byuser=(req.user.usertype==='ADMIN')?{referenceid:req.user.rowid}:{referenceid:req.user.adminid};
        locationService.ListAllFilter(byuser,(err,locs) => {
            if(!err) req.flash('error',"No Locations for this user!")
        devicePosition.ListAllFilter(byuser,(err,devpos) => {
            if(!err) req.flash('error',"No Device Positions found!")
        var pageData={mode:'add',urlRoute:"devices",action:'add',locations:locs,deviceposition:devpos}
        res.render('./UI/devices/editdevice',{result:{},pageData})  
        })
      })
        }

 getAll(req,res){
    var adminid=(req.user.usertype==='ADMIN')?req.user.rowid:req.user.adminid;    
   var  byuser={referenceid:adminid};
    devicedetService.ListAllFilter(byuser,(err,result) => {
        pageResponse(err,result,res,'./UI/common/UIlist',{pTitle:'Devices',urlRoute:'devices',btnConfig:true});
    });
 }

 getByName(req,res){
    devicedetService.getByName(req.params.name,(err,result) => {
        pageResponse(err,result,res,'');       
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
    devicedetService.addRow(newrow,(err,result) => {
        if(!err && result!==null){
           newrow.userid=newrow.referenceid;
           newrow.deviceid=result.rowid;
           newrow.userlocation=req.user.locationid;
           newrow.devicelocation=result.locationid;
           newrow.access_type=result.devicetype;
           if(newrow.positionid==="")newrow.positionid=null;
           if(newrow.locationid==="")newrow.locationid=null;
           userdeviceService.addRow(newrow,(err,result) => {
             if(err)checkerror(err,res,'/devices');
           });
        }
        pageRedirect(err,result,res,'/devices');         
    });
 } 

 update(req,res){
     var rowid=(req.body.rowid!==null)?req.body.rowid:req.params.id;    
    if(rowid===null || rowid==='')checkerror(err,res,'/devices');
    else {
       var newrow=req.body;       
       newrow.updated_by=req.user.username;
       newrow.updated_dt=new Date().toISOString().replace('T', ' ').substr(0, 19);
       if(newrow.positionid==="")newrow.positionid=null;
       if(newrow.locationid==="")newrow.locationid=null;
       devicedetService.updateRow(rowid,newrow,(err,result) => {
           pageRedirect(err,result,res,'/devices');        
       });
     }
    }  

 remove(req,res){
    var rowid=(req.params.rowid)?req.params.rowid:req.body.rowid;
    if(!rowid)checkerror(err,res,'/devices');
    else {
        edgedevices.getCount({deviceid:rowid},(err,result)=>{
            if(err)checkerror(err,res,'/devices');
            else{
               //console.log(result)
                if(result!==0){
                    req.flash("error","Delete Edgedevices before deleting this Device!")
                    pageRedirect(err,result,res,'back');        
                }
                else
                {
                 // delete from userdevices and then on devices
                 userdeviceService.deleteFilter({deviceid:rowid},(err,result)=>{
                     if(err)checkerror(err,res,'/devices');
                     else
                     { devicedetService.deleteRowId(rowid,(err,result) => {
                         pageRedirect(err,result,res,'/devices');  
                      });}
                 });  
        
                }
        }
        });    
    }
 } 

 getEdgeDevice(req,res){
    var rowid=req.params.id;
   
  devicedetService.ListAllFilter({rowid:rowid},(err,device)=>{
        if(err){
        res.flash("Device Not found!");
        checkerror(err,res,'/devices/view/'+rowid);
        } 
        else{
           // console.log(device)
      edgedevices.ListAllFilter({deviceid:rowid},(err,result)=>{         
        pageResponse(err,result,res,'./UI/edges/deviceedges',{pTitle:'Edge Nodes',device:device,urlRoute:'edges',backUrl:'devices/view/'+rowid});  
        });
    }
    });
  }


  getConfigJson(req,res)
  {
    var adminid=(req.user.usertype==='ADMIN')?req.user.rowid:req.user.adminid;    
    var  byuser={referenceid:adminid};
     devicedetService.getConfigJson(byuser,(err,result)=>{
        sendJson(err,result,res,"devices.json");            
     });
  }
 
    getAllEdges(req,res){
        devicedetService.getAllEdges((err,result) => {
        sendResponse(err,result,res);
    });
 }
}
module.exports=new devicedetctl(devicedetService);