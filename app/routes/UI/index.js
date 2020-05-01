const {checkAurth,checkNotAurth}=require('./../../middleware/passport-config')
const ejsLayout=require("express-ejs-layouts")
var userRoute=require("./user")
var devdetRoute=require("./devicedet")
/*

var groupRoute=require("./group")
var locRoute=require("./location")
var edgeRoute=require("./edge")
var devposRoute=require("./devicepos")

var usrdevRoute=require("./userdevices")
*/
module.exports=(app)=>{
  app.use(ejsLayout); 
  app.set('views','./app/views')
  app.set('view engine','ejs')

  // simple route
  app.get("/", checkAurth,(req, res) => {
    // res.json({ message: "Welcome to myiot application." });
    res.render('./UI/home') 
   });
   
  app.get('/login',checkNotAurth,(req,res)=>{
      res.render('login',{ layout: './UI/layout/LoginLayout' })
     })
  
  app.get('/home',checkAurth,(req,res)=>{
       res.render('./UI/home')
      })
      
  app.get('/logout',(req,res)=>{
     req.logOut()
     res.redirect('/login')
   })

   app.use("/users",checkAurth,userRoute)
   app.use("/devices",devdetRoute)
  /* 
    app.use("/api/groups",groupRoute)
    app.use("/api/edges",edgeRoute)
    app.use("/api/devlocs",devposRoute)
    app.use("/api/locations",locRoute)

    app.use("/api/userdevices",usrdevRoute)
    */
}