const express=require('express');
const mongoose = require('mongoose');
const router=express.Router();
const passport=require('passport');
const middleware=require('../middleware/index')
const User=require('../models/users');
const nodemailer=require('nodemailer');
var bcrypt=require("bcryptjs");
const crypto=require('crypto');
//nodemailer config

var transport=nodemailer.createTransport({
	service:'gmail',
	auth:{
	  user:'simonagarwal0906@gmail.com',
	pass:'Simon@123$'
  }
  })


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

//reset password
router.post('/resetPassword',function(req,res,next){
  var email=req.body.email;
  console.log("email is:"+email);
  //generate token
  crypto.randomBytes(32,(err,buffer)=>{
    if(err){
      console.log(err);
    }
    else{
      const token=buffer.toString("hex");
      User.findOne({email:email},(err,user)=>{
        if(err){
          res.send({success:false,message:'Something went wrong!'});
        }
        else if(!user){
          res.send(({success:false,message:'User not found'}))
        }
        else{
          user.resetToken=token;
          user.expireToken=Date.now() + 3600000;
          user.save().then((result)=>{
            console.log(token)
            var mailOptions={
              from:'simonagarwal0906@gmailcom',
              to:user.email,
              subject:'Sringar Reset Password',
              html:`<h4>Click on the <a href="http://localhost:4200/setPassword/${user.resetToken}">link</a> to reset your password</h4>`
            }
            transport.sendMail(mailOptions,function(err,info){
              if(err){
                console.log(err);
               res.send({success:false,message:'Something went wrong'})
              }
              else{
                console.log("Email sent");
                res.send({success:true,message:'Please check your e-mail inbox.Do check your spam and promotions inbox!'})
              }
            })
          })
         
        }
      })
    }
  })
  
  
})

//set new password
router.post('/setPassword',function(req,res,next){
  var user={
    password:req.body.password,
    token:req.body.token
  }
  User.findOne({resetToken:user.token,expireToken:{$gt:Date.now()}}).then(foundUser=>{
    if(!foundUser){
      return res.send({success:false,message:'Session Expired!Please try again.'})
    }
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(user.password,salt,(err,hash)=>{
          if(err) throw err;
          foundUser.password=hash;
          foundUser.resetToken=undefined;
          foundUser.expireToken=undefined
          foundUser.save().then((updated=>{
            res.send({success:true,message:'Password Updated Successfully'})
          }));
      })
      })
  })
})


module.exports=router;