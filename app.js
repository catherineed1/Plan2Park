const express     = require('express');  
const mongoose    = require('mongoose');  
const bodyParser  = require('body-parser');  
const cookieParser  = require('cookie-parser');
const path        = require('path');  
const $           = require('jquery');  

//connect to db  
mongoose.connect('mongodb+srv://cdaly:210301Cathy@cluster0.otm70ca.mongodb.net/plan2park?retryWrites=true&w=majority' ,{useNewUrlParser:true})  
    .then(()=>console.log('✅ Successfully connected to DB'))  
    .catch((err)=>console.log('❌ DB connection error',err));
    
mongoose.set('strictQuery', true);
  
//init app  
const app = express();  
  
//set the template engine  
app.set('view engine','ejs');  
  
//fetch data from the request  
app.use(bodyParser.urlencoded({extended:false}));  

app.use(cookieParser());
  
//set the path of the jquery file to be used from the node_module jquery package  
app.use('/jquery',express.static(path.join(__dirname+'/node_modules/jquery/dist/')));  
  
//set static folder(public) path  
app.use(express.static(path.join(__dirname+'/public')));  
  
//default page load  
app.get('/',(req,res)=>{  
  res.redirect('/plan2park/home');  
});  
  
//routes  
app.use('/plan2park',require('./routes/pageRouter'));  
app.use('/',require('./routes/pageRouter'));  
  
//assign port  
const PORT  = process.env.PORT || 8080;  
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));