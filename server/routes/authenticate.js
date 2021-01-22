const express=require('express');
const mongoose = require('mongoose');
const router=express.Router();
const passport=require('passport');
const middleware=require('../middleware/index')
const User=require('../models/users');

//register
router.post('/register',(req,res,next)=>{
    let newUser=new User({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    
    })
     //check if username already exist
    User.findOne({username:newUser.username},(err,founduser)=>{
        if(err){
            return res.json({success:false,msg:'Something went wrong'});
        }
      else if(founduser){
          return res.json({success:false,msg:'Username already exists'});
      }
      //if not add user
    else{
        User.addUser(newUser,(err,user)=>{
       if(err){
                   res.json({success:false,msg:'Failed To Register'});
               }
               else{
                  console.log(user);
                        res.json({success:true,msg:'Registered'});
                    }
        })
    
    }
    })
      
})

//login
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return res.send(err); }
      if (!user) { return res.json({success:false,msg:'User Does Not Exist'}); }
      req.logIn(user, function(err) {
        if (err) { return res.send(err); }
        return res.json({success:true,msg:'You Are Logged in',user:user});
      });
    })(req, res, next);
  });

  router.get("/profile",middleware.isAuth,function(req,res,next){
    
    res.send(req.user);

  })

  router.get('/logout',middleware.isAuth,function(req,res,next){
    req.logout();
    return res.json({success:true,message:'logged out'});
  })

//middleware



module.exports=router;