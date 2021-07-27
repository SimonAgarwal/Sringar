const express=require('express');
const mongoose = require('mongoose');
const router=express.Router();
const products=require('../models/products');
const User=require('../models/users');
const middleware=require('../middleware/index')

//get earrings
router.get('/products/earrings',(req,res,next)=>{
   products.find({category:'earrings'},(err,products)=>{
       if(err){
           res.send({msg:"Something went wrong",products:null});
       }
       else{
          console.log(req.user)
           res.send({msg:"Found",products:products,user:req.user})
       }
   })
})

//get rings
router.get('/products/rings',(req,res,next)=>{
    products.find({category:'ring'},(err,products)=>{
        if(err){
            res.send({msg:"Something went wrong",products:null});
        }
        else{
           console.log(req.user)
            res.send({msg:"Found",products:products,user:req.user})
        }
    })
 })

 //get necklace
router.get('/products/necklaces',(req,res,next)=>{
    products.find({category:'necklace'},(err,products)=>{
        if(err){
            res.send({msg:"Something went wrong",products:null});
        }
        else{
           console.log(req.user)
            res.send({msg:"Found",products:products,user:req.user})
        }
    })
 })

 //get bracelet
router.get('/products/bracelets',(req,res,next)=>{
    products.find({category:'bracelet'},(err,products)=>{
        if(err){
            res.send({msg:"Something went wrong",products:null});
        }
        else{
           console.log(req.user)
            res.send({msg:"Found",products:products,user:req.user})
        }
    })
 })


//add item in cart

router.post("/cart",(req,res,next)=>{
    var product= {
        _id:req.body._id,
        }


console.log(req.user)
    products.findOne({_id:product._id},(err,product)=>{
        if(err){
            console.log(err)
            res.json({sucess:false,message:"Product could not be added"})
        }
        else if(product){
            User.findOne({_id:req.user._id},(error,user)=>{
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
            console.log("Product not found")
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

router.get("/cart",(req,res,next)=>{
    id=req.params.id;
    console.log(id);
    
User.findOne({_id:req.user._id}).populate('cart').exec((err,user)=>{
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

//delete cart item
router.delete("/:id/removeCart",(req,res,next)=>{
    var product= {
        _id:req.params.id,
        }

    products.findOne({_id:product._id},(err,product)=>{
        if(err){
            console.log(err);
            res.json({sucess:false,message:"Product could not be removed"})
        }
        else if(product){
            User.findOne({_id:req.user.id},(error,user)=>{
                if(error){
                    res.send({message:"error"});
                }
                if(!user){
                    res.send("login first");
                }
                else{
                    //Remove only one element if same products added man times
                    var arr=user.cart;
                    var index=arr.indexOf(product._id);
                    arr.splice(index, 1);
                    console.log(arr);
                   // user.cart.pull(product);
                    user.cart=arr;
                    user.save();
                    res.send({success:"true",message:"Remove from Cart"});
                }
            })

        }
        else{
            console.log("product not")
            res.json({sucess:false,message:"Product could not be removed"})
        }
    })

})

//wishlist

//add item in wishlist

router.post("/wishlist",(req,res,next)=>{
    var product= {
        _id:req.body._id,
        }
console.log(product._id)

    products.findOne({_id:product._id},(err,product)=>{
        if(err){
            console.log(err)
            res.json({sucess:false,message:"Product could not be added to wishlist"})
        }
        else if(product){
            User.findOne({_id:req.user._id},(error,user)=>{
                if(error){
                    res.send({message:"error"});
                }
                if(!user){
                    res.send("login first");
                }
                else{
                    user.wishlist.push(product);
                    user.save();
                    res.send({success:"true",message:"Added to Wishlist"});
                }
            })

        }
        else{
            console.log("Product not found")
            res.json({sucess:false,message:"Product could not be added"})
        }
    })
})

router.get("/wishlist",(req,res,next)=>{
    id=req.params.id;
    console.log(id);
    
User.findOne({_id:req.user._id}).populate('wishlist').exec((err,user)=>{
    if(err){
        res.send(err);
    }
    else{
        console.log(user.wishlist);
        res.send(user.wishlist);
    }
})

})

//delete wishlist item
router.delete("/:id/removeWishlist",(req,res,next)=>{
    var product= {
        _id:req.params.id,
        }

    products.findOne({_id:product._id},(err,product)=>{
        if(err){
            console.log(err);
            res.json({sucess:false,message:"Product could not be removed"})
        }
        else if(product){
            User.findOne({_id:req.user.id},(error,user)=>{
                if(error){
                    res.send({message:"error"});
                }
                if(!user){
                    res.send("login first");
                }
                else{
                    //Remove only one element if same products added man times
                    var arr=user.wishlist;
                    var index=arr.indexOf(product._id);
                    arr.splice(index, 1);
                    console.log(arr);
                   // user.cart.pull(product);
                    user.wishlist=arr;
                    user.save();
                    res.send({success:"true",message:"Removed from Wishlist"});
                }
            })

        }
        else{
            console.log("product not")
            res.json({sucess:false,message:"Product could not be removed"})
        }
    })

})

module.exports=router;

