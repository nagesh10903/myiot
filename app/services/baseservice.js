
class baseservice {
  constructor(model){
        this.model= model;
    }    
    getAll(callback){
        this.model.findAll({raw:true})
        .then((tbl,error)=>{
          this.errcheck(tbl,error,callback);              
      });
    }
  ListAll(callback){
      this.model.findAll({where:byuser,attributes:
              {exclude:['created_dt','updated_dt','updated_by','created_by','version','adminid','status','password','referenceid']}
              ,raw:true})
      .then((tbl,error)=>{
        this.errcheck(tbl,error,callback);              
    });
  }

  ListAllFilter(byuser,callback){
    this.model.findAll({where:byuser,attributes:
            {exclude:['created_dt','updated_dt','updated_by','created_by','version','adminid','status','password','referenceid','controler']}
            ,raw:true})
    .then((tbl,error)=>{
      this.errcheck(tbl,error,callback);              
  });
  }
getById(id,callback){
    this.model.findByPk(id,{raw:true})
    .then((tbl,error)=>{
      this.errcheck(tbl,error,callback);                
  });
  }
  
  getByFilter(condition,callback){
    this.model.findAll({where:condition},{raw:true})
    .then((tbl,error)=>{
      this.errcheck(tbl,error,callback);                
  });
  }
  getByName(name,callback){
    this.model.findAll({where:{name:name}},{raw:true})
    .then((tbl,error)=>{
      this.errcheck(tbl,error,callback);                
  });
  }
  getCount(bycondition,callback)
  {
    this.model.count({where:bycondition,distinct:true})
    .then((tbl,error)=>{
      this.errcheck(tbl,error,callback);                
  });
    
  }
 
  addRow(data,callback)
  {
    this.model.create(data)
    .then((tbl,error)=>{
      this.errcheck(tbl,error,callback);   
    });  
  }
  updateRow(rowid,data,callback)
  {            
      this.model.update(data,{where:{rowid:rowid}})
      .then((tbl,error)=>{           
         this.errcheck(tbl,error,callback);   
       })
  }
  saveUpdate(rowid,data,callback)
  {        
    this.model.save(data,{where:{rowid:rowid}})
     .then((tbl,error)=>{
       this.errcheck(tbl,error,callback);   
     })
  }
  deleteRowId(rowid,callback)
  {   
    this.model.destroy({where:{rowid:rowid}})
    .then((tbl,error)=>{
     this.errcheck(tbl,error,callback);   
    })
  }
  deleteFilter(bycondition,callback)
  {   
    this.model.destroy({where:bycondition})
    .then((tbl,error)=>{
     this.errcheck(tbl,error,callback);   
    })
  }
  deleteRow(data,callback){        
    deleteRowId(data.rowid,callback)
  }

errcheck(tbl,error,callback){
  if (error) {
    return callback(error)
  }
return callback(null,tbl)                 
  }
}
//export default baseservice;
module.exports= baseservice;