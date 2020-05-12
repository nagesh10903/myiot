
const basecontroler=require("../basecontroler");
const deviceposService=require("../../services/deviceposition");
const devicedetService=require("../../services/devicedetails");
const {pageResponse,pageRedirect}=require("../../lib/ctrlResponse")
var mode="list";
var byuser="";
class devicelocctl extends basecontroler{
    constructor(deviceposService){
       super(deviceposService);
       this.svr=deviceposService;
     }
   
  getById(req,res){
    mode=(req.route.path.startsWith('/edit'))?'edit':(req.route.path.startsWith('/add'))?'add':'view';
    deviceposService.getById(req.params.id,(err,result)=>{
        if(mode==='add')result={rowid:""};
        if(mode==='view'){
            pageResponse(err,result,res,'./UI/position/viewposition',{mode:mode,urlRoute:"devpos",action:'delete'});            
        }
        else pageResponse(err,result,res,'./UI/position/editposition',{mode:mode,urlRoute:"devpos",action:mode});               
        });
    }

  getByIdAdd(req,res){
    mode=(req.route.path.startsWith('/add'))?'add':(req.route.path.startsWith('/new'))?'new':'add';     
      var backurl="devpos";
      var page="editposition";
      if(mode==="new"){   
          backurl="devices/edit/"+req.params.id; 
          page="editposmodal";
        } 
       // console.log(req.headers.referer)
      var pageData={mode:'add',urlRoute:backurl,action:'add'};
      res.render('./UI/position/'+page,{result:{},pageData})  
      }
      
 getAll(req,res){
    var adminid=(req.user.usertype==='ADMIN')?req.user.rowid:req.user.adminid;    
    var   byuser={referenceid:adminid};
    deviceposService.ListAllFilter(byuser,(err,result) => {
          pageResponse(err,result,res,'./UI/common/UIlist',{pTitle:'Device Positions',urlRoute:'devpos'});    
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
    deviceposService.addRow(newrow,(err,result) => {
        pageRedirect(err,result,res,'back');         
    });
 } 

 update(req,res){
    var rowid=(req.body.rowid!==null)?req.body.rowid:req.params.id;    
    if(rowid===null || rowid==='')pageResponse(null,0,res);
    else {
        var newrow=req.body;
        newrow.updated_by=req.user.username;
        newrow.updated_dt=new Date().toISOString().replace('T', ' ').substr(0, 19);
        deviceposService.updateRow(rowid,newrow,(err,result) => {
            //console.log(req.headers.referer)
             pageRedirect(err,result,res,'back');         
         });
      }
 } 
 
 remove(req,res){
    var rowid=(req.body.rowid!==null)?req.body.rowid:req.params.id;     
    if(rowid===null || rowid==='')pageResponse(null,0,res);
    else{
        devicedetService.getCount({positionid:rowid},(err,result)=>{
            if(err)checkerror(err,res,'/devices');
            else{
                if(result!==0){
                    req.flash("error","Unlink  all Devive Positions with this position!")
                    pageRedirect(err,result,res,'back');        
                }
                else
                {
                    deviceposService.deleteRowId(rowid,(err,result) => {
                        pageRedirect(err,result,res,'/devpos');      
                     })
                }
            }
        })
   }
 }
}
module.exports=new devicelocctl(deviceposService);