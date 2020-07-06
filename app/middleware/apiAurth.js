
const userService=require("../services/user");
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
   } 

var params = {
    secretOrKey: process.env.SESSION_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function() {
    var jwtstrategy = new Strategy(params, function(payload, done) {
        userService.getById(payload.id,(err,user)=>{
            if (user) {
                return done(null, {
                  rowid:user.rowid,usertype:user.usertype
                });
            } else {
                return done(new Error("User not found"), null);
            }
          })
    });
    passport.use(jwtstrategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", {session:true});
        }
    };
};