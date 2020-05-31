
var userRoute=require("./user")
var groupRoute=require("./group")
var locRoute=require("./location")
var edgeRoute=require("./edge")
var devposRoute=require("./devicepos")
var devdetRoute=require("./devicedet")
var usrdevRoute=require("./userdevices")

module.exports=(app)=>{
    app.use("/api/users",userRoute)
    app.use("/api/groups",groupRoute)
    app.use("/api/edges",edgeRoute)
    app.use("/api/devlocs",devposRoute)
    app.use("/api/locations",locRoute)
    app.use("/api/devices",devdetRoute)
    app.use("/api/userdevices",usrdevRoute)
}