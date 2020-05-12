const LocalStrategy =require("passport-local").Strategy;
const bcrypt=require("bcrypt");
const userService=require("../services/user");
function initialize(passport)
{ 
  const authenticateUser= async (email,password,done)=>{
     await userService.getuserByEmail(email,(err,user)=>{
      if(user===null || user==0 || err){
          return done(null,false,{message:"No user Found with this Email !"})
      }
      try{
     //   console.log(password,user.password)
           if(bcrypt.compareSync(password,user.password)===true || password===user.password ){
             return  done(null,user)
           }          
          else {
            return done(null,false,{message:"password Incorrect"})  
          }
        }      
      catch(e){
          return done(e)
      }           
    })     
  }   

 passport.use(new LocalStrategy({usernameField:'email'},
              authenticateUser))
 passport.serializeUser((user,done)=>done(null,user.rowid))
 passport.deserializeUser((rowid,done)=>{
   userService.getById(rowid,(err,user)=>{
     if(err)done(null,false)
     done(null,user)
    })
})
}

 //To restrict unlogged users to login page.
 function checkAurth(req,res,next){
    if(req.isAuthenticated()){
      return next()
    }
    res.redirect('/login')
   }
   
   //To restrict logged users not to access to login page.
   function checkNotAurth(req,res,next){ 
     if(req.isAuthenticated()){
       return   res.redirect('/home')
     }
     next()
    }
module.exports={initialize,checkAurth,checkNotAurth}

