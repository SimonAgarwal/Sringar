const express=require('express');
const mongoose = require('mongoose');
const router=express.Router();
const products=require('../models/products');
const User=require('../models/users');
router.get('/products',(req,res,next)=>{
   products.find({},(err,products)=>{
       if(err){
           res.send({msg:"Something went wrong",products:null});
       }
       else{
           console.log(products);
           res.send({msg:"Found",products:products})
       }
   })
})

router.post("/cart",(req,res,next)=>{
    var product= {
        _id:req.body._id,
        }

    products.findOne({_id:product._id},(err,product)=>{
        if(err){
            res.json({sucess:false,message:"Product could not be added"})
        }
        else if(product){
            User.findOne({username:req.user.username},(error,user)=>{
                if(error){
                    res.send({message:"error"});
                }
                if(!user){
                    res.send("login first");
                }
                else{
                    user.cart.push(product);
                    user.save();
                    res.send({success:"true",message:"Added to Cart"});
                }
            })

        }
        else{
            res.json({sucess:false,message:"Product could not be added"})
        }
    })



    /*User.findOne({username:req.user.username},(err,user)=>{
        if(err){
            res.send({message:"error"});
        }
        if(!user){
            res.send("login first");
        }
        else{
            user.cart.push(product);
            user.save();
            res.send({success:"true",message:"Added to Cart"});
        }
    })*/

})

router.get("/:id/cart",(req,res,next)=>{
    id=req.params.id;
    console.log(id);
    
User.findOne({_id:id}).populate('cart').exec((err,user)=>{
    if(err){
        res.send(err);
    }
    else{
        console.log(user.cart);
        res.send(user.cart);
    }
})

})

//product show route

router.get('/products/:id',(req,res,next)=>{
    var id=req.params.id;
    products.findOne({_id:id},(err,product)=>{
        if(err){
            res.json({success:false,message:'Something went wrong'});
        }
        else{
            res.json({success:true,product:product});
        }
    })
})



module.exports=router;

