const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const cors=require("cors");
const passport=require('passport');
const session=require("express-session");

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

app.use(cors());
app.use(bodyParser.json());
app.use(require("express-session")({
	secret:"Anything",
	resave:false,
	saveUninitialized:false
	}));

	require('./config/passport');
	
app.use(passport.initialize());
app.use(passport.session());


app.use("/",product);
app.use(authenticate);

app.listen(3000,()=>{
    console.log("server started");
})