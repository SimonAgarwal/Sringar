const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const cors=require("cors");
const passport=require('passport');
const session=require("express-session");
const cookieParser=require('cookie-parser');



const config=require("./config/mongoose");
mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{
    console.log("Connected to database"+config.database);
})
mongoose.connection.on('error',(err)=>{
    console.log("Not connected"+err);
})
const app=express();
const product=require("./routes/product");
const authenticate=require("./routes/authenticate");

app.use(cors({
	origin:['http://localhost:4200'],
	credentials:true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require("express-session")({
	secret:"Anything",
	resave:false,
	saveUninitialized:false
	}));

	require('./config/passport');
	
app.use(passport.initialize());
app.use(passport.session({
	name:'simon',
	resave:false,
	saveUninitialized:false,
	secret:'simon',
	cookie:{
		maxAge:36000000,
		httpOnly:false,
		secure:false
	}
}));


app.use("/",product);
app.use(authenticate);

app.listen(3000,()=>{
    console.log("server started");
})