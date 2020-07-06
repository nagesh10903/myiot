const {checkToken}=require('../../middleware/passport-config')
var apiauth = require("../../middleware/apiAurth")();
var userRoute=require("./user")
var groupRoute=require("./group")
var locRoute=require("./location")
var edgeRoute=require("./edge")
var devposRoute=require("./devicepos")
var devdetRoute=require("./devicedet")
var usrdevRoute=require("./userdevices")
var datalogRoute=require("./datalog")

module.exports=(app)=>{
    app.use("/api/users",apiauth.authenticate(),userRoute)
    app.use("/api/groups",apiauth.authenticate(),groupRoute)
    app.use("/api/edges",apiauth.authenticate(),edgeRoute)
    app.use("/api/devlocs",apiauth.authenticate(),devposRoute)
    app.use("/api/locations",apiauth.authenticate(),locRoute)
    app.use("/api/devices",apiauth.authenticate(),devdetRoute)
    app.use("/api/userdevices",apiauth.authenticate(),usrdevRoute)
    app.use("/api/datalog",apiauth.authenticate(),datalogRoute)
}