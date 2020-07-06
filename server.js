if(process.env.NODE_ENV !== 'production'){
 require("dotenv").config();
}
const express = require("express");
const bodyParser = require("body-parser");
const cors= require("cors");    
const passport=require("passport")
const apiauth = require("./app/middleware/apiAurth")();
const flash=require("express-flash")
const http=require("http");
const path=require("path")
const initializePassport=require('./app/middleware/passport-config').initialize
const {getApiToken}= require('./app/middleware/passport-config')

const app = express();
const corsOptions={origin:"http://localhost:8081"};

initializePassport(passport)

app.use(bodyParser.json());

 //UI use.. 
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname,"app/assets")));
app.use(express.static(path.join(__dirname, 'assets')));
//UI Use ,<-end

app.use(express.urlencoded({extended:false}))

app.use(express.json());


require("./app/middleware/sessionstate")(app)
app.use(flash())
app.use(passport.initialize())
app.use(apiauth.initialize());
app.use(passport.session())

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// to get the user variable in view files as local variables
app.use(function (req, res, next) {res.locals.user=req.user;res.locals.message=req.flash('error');next();});

//Api routes for app
require("./app/routes/api")(app)

//UI routes for app
require("./app/routes/UI")(app)

app.post('/login',passport.authenticate('local',{
  successRedirect:'/home',
  failureRedirect:'/login',
  failureFlash:"Invalid Email/Password !"
}))

app.post('/token',getApiToken)

// set port, listen for requests
const PORT=process.env.APP_PORT||8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}); 