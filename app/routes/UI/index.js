const {checkAurth,checkNotAurth}=require('./../../middleware/passport-config')
const ejsLayout=require("express-ejs-layouts")
var userRoute=require("./user")
var devdetRoute=require("./devicedet")
var locRoute=require("./location")
var edgeRoute=require("./edge")
var usrdevRoute=require("./userdevices")
var devposRoute=require("./devicepos")
var homeRoute=require("./home")

module.exports=(app)=>{
  app.use(ejsLayout); 
  app.set('views','./app/views')
  app.set('view engine','ejs')

  // simple route
  app.get("/", checkAurth,homeRoute);
   
  app.get('/login',checkNotAurth,(req,res)=>{
      res.render('login',{ layout: './UI/layout/LoginLayout' })
     })
        
  app.get('/logout',(req,res)=>{
     req.logOut()
     req.session.destroy((err)=>{
       if(err) console.log('Session Logout Error!',err)
     })
     res.redirect('/login')
   })

   app.use("/users",checkAurth,userRoute)
   app.use("/devices",checkAurth,devdetRoute)
   app.use("/locations",checkAurth,locRoute)
   app.use("/edges",checkAurth,edgeRoute)
   app.use("/userdev",checkAurth,usrdevRoute)
   app.use("/devpos",devposRoute)
   app.use("/home",checkAurth,homeRoute)
}