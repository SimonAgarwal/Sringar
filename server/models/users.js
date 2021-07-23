var mongoose=require("mongoose");
var bcrypt=require("bcryptjs");
var products=require('./products');
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date,
    cart:[
        {
			type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
          }

         
    ],
    wishlist:[
        {
			type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
          }

         
    ]

    
})

userSchema.methods.comparePassword=function(hashedPassword){
    return bcrypt.compareSync(hashedPassword,this.password);
}

module.exports=mongoose.model('User',userSchema);

module.exports.addUser=function(newUser,callback){
    
    bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(newUser.password,salt,(err,hash)=>{
        if(err) throw err;
        newUser.password=hash;
        newUser.save(callback);
    })
    })
    }
    /*module.exports.comparePassword=function(candidatePassword,hash,callback){
        bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
            if(err) throw err;
            callback(null,isMatch);
        })
    }*/
    