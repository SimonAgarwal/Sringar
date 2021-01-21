var middlewareObj={};
middlewareObj.isAuth=function isAuth(req,res,next){
    if(req.isAuthenticated()) next();
    else
     res.send("PLEASE LOGIN FIRST");
  }

  module.exports=middlewareObj;