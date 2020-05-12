
const basecontroler=require("../basecontroler");
const edgeService=require("../../services/edgecontroler");
const devicedetService=require("../../services/devicedetails");
const {pageResponse,pageRedirect,checkerror}=require("../../lib/ctrlResponse")
const Op = require('sequelize').Op;
var mode="list";
var byuser="";
class edgectl extends basecontroler{
    constructor(edgeService){
       super(edgeService);
       this.svr=edgeService;
     }
   
 
 getById(req,res){
    mode=(req.route.path.startsWith('/edit'))?'edit':(req.route.path.startsWith('/add'))?'add':'view';
   
    var  option={rowid:req.params.id};
 edgeService.getDetails(option,(err,result)=>{
   // console.log(result)
    if(mode==='add'){result={rowid:""}; }      
     else if(mode==='view'){
         pageResponse(err,result,res,'./UI/edges/viewedge',{mode:mode,urlRoute:"edges",action:'delete'});            
     }  
     else 
     {
        pageResponse(err,result,res,'./UI/edges/editedge',{mode:mode,urlRoute:"edges",action:mode,devices:[]});  
    }         
     });            
  }
  getByIdAdd(req,res){
      var adminid=(req.user.usertype==='ADMIN')?req.user.rowid:req.user.adminid;    
      var  byuser={ [Op.and]:[{referenceid:adminid},{devicemode:"CONTROLER"}]};
      mode="add";
      devicedetService.ListAllFilter(byuser,(err,devices) => {
        if(devices.length===0 || err) {
             if(!err){req.flash("error","No Devices Mode as Controlers Found !")}
             pageRedirect(err,1,res,'back'); 
            }
          else {
             // console.log(devices)
              pageResponse(err,{},res,'./UI/edges/editedge',{mode:'add',urlRoute:"edges",action:'add',devices:devices});  
          }    
       });            
      } 
 getAll(req,res){
    var adminid=(req.user.usertype==='ADMIN')?req.user.rowid:req.user.adminid;    
   var  byuser={userid:adminid};

   edgeService.ListAllFilter(byuser,(err,result) => {
        pageResponse(err,result,res,'./UI/common/UIlist',{pTitle:'Edge Devices',urlRoute:'edges'});
    });
 } 
     add(req,res){
        var newrow=req.body;
        if(req.user.usertype==='ADMIN')newrow.userid=req.user.rowid;
        else newrow.userid=req.user.adminid;
        newrow.created_by=req.user.username;
        newrow.updated_by=req.user.username;
        newrow.updated_dt=new Date().toISOString().replace('T', ' ').substr(0, 19);
        newrow.created_dt= newrow.updated_dt;
        edgeService.addRow(newrow,(err,result) => {           
          if(err)checkerror(err,res,'back');              
            else {
            pageRedirect(err,result,res,'/edges'); 
            }        
        });
     } 
    
     update(req,res){
         var rowid=(req.body.rowid!==null)?req.body.rowid:req.params.id;    
        if(rowid===null || rowid==='')checkerror(err,res,'back');
        else {
           var newrow=req.body;       
           newrow.updated_by=req.user.username;
            newrow.updated_dt=new Date().toISOString().replace('T', ' ').substr(0, 19);
            edgeService.updateRow(rowid,newrow,(err,result) => {
                pageRedirect(err,result,res,'/edges');        
            });
         }
     } 
     remove(req,res){
        var rowid=(req.body.rowid!==null)?req.body.rowid:req.params.id;     
        if(rowid===null || rowid==='')checkerror(err,res,'back');
        else{
            edgeService.deleteRowId(rowid,(err,result) => {
               pageRedirect(err,result,res,'/edges');      
            });
       }
     }
}
module.exports=new edgectl(edgeService);