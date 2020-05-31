if(process.env.NODE_ENV !== 'production'){
  require("dotenv").config();
 }
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var {dblogger}= require("../../config/logger")
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var db        = {};


const sequelize = new Sequelize(process.env.MYSQL_DB,process.env.DB_USER,process.env.DB_PASS,
                     { host: process.env.DB_HOST,dialect: 'mysql',logging: msg=>dblogger.info(msg),
                       define:{timestamps:false} }
                   );

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); 
  }
});
//sequelize.sync();
//Associations
//-- userdevices Associations
db.userdevices.belongsTo(db.user, {
  foreignKey: "userid"
});
db.userdevices.belongsTo(db.location, {
  foreignKey: "userlocation" ,as:'userlocations'
});
db.userdevices.belongsTo(db.location, {
  foreignKey: "devicelocation",as:"devicelocations"
});
db.userdevices.belongsTo(db.devicedetails, {
  foreignKey: "deviceid"
});
//-- Device details Associations
db.devicedetails.hasMany(db.edgecontrolers, {
  foreignKey: "deviceid",as:'e'
});
db.edgecontrolers.belongsTo(db.devicedetails,{foreignKey: "deviceid",as:'e'});

db.devicedetails.belongsTo(db.deviceposition, {
  foreignKey: "positionid",as:'p'
});
   
db.devicedetails.belongsToMany(db.location, 
  {through:db.userdevices,foreignKey:"devicelocation",otherKey:"deviceid"}
  );
  
//User Associations
db.user.belongsToMany(db.devicedetails, 
  {through:db.userdevices,foreignKey:"userid"}
  );
  db.devicedetails.belongsToMany(db.user, 
    {through:db.userdevices,foreignKey:"deviceid"}
    );

 db.user.belongsToMany(db.location, 
   {through:db.userdevices,foreignKey:"userid", otherKey:"userlocation"}
   );
// Location associations
db.location.belongsToMany(db.devicedetails, 
  {through:db.userdevices,foreignKey:"devicelocation",otherKey:"deviceid"}
  );

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;