if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
   }
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
 const SessionStore = require('express-session-sequelize')(expressSession.Store);
 var {dblogger}= require("../config/logger")
 const Sequelize = require('sequelize');
 const myDatabase =new Sequelize(process.env.MYSQL_DB,process.env.DB_USER,process.env.DB_PASS, { host: process.env.DB_HOST,dialect: 'mysql'
 ,logging: msg=>dblogger.info(msg) });
  
 const sequelizeSessionStore = new SessionStore({
     db: myDatabase,
 });
 

module.exports=(app)=>{ 

    app.use(cookieParser());
    app.use(expressSession({
        secret: process.env.SESSION_SECRET,
        store: sequelizeSessionStore,
        resave: false,
        saveUninitialized: false,
        unset:'destroy'
    // ,cookie: { secure: true }
    }));

  /*  app.use(expressSession({
        secret:process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:false
      }))
      */
}


