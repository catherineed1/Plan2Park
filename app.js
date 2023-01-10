const express     = require('express');  
const mongoose    = require('mongoose');  
const bodyParser  = require('body-parser');  
const path        = require('path');  
const $           = require('jquery');  
  
//connect to db  
mongoose.connect('mongodb+srv://cdaly:210301Cathy@cluster0.otm70ca.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true})  
    .then(()=>console.log('✅ Successfully connected to DB'))  
    .catch((err)=>console.log('❌ DB connection error',err))  
  
//init app  
const app = express();  
  
//set the template engine  
app.set('view engine','ejs');  
  
//fetch data from the request  
app.use(bodyParser.urlencoded({extended:false}));  
  
//set the path of the jquery file to be used from the node_module jquery package  
app.use('/jquery',express.static(path.join(__dirname+'/node_modules/jquery/dist/')));  
  
//set static folder(public) path  
app.use(express.static(path.join(__dirname+'/public')));  
  
//default page load  
app.get('/',(req,res)=>{  
  res.redirect('/task/home');  
});  
  
//routes  
app.use('/task',require('./routes/taskroute'));  
  
//assign port  
const PORT  = process.env.PORT || 8080;  
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));