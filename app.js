const express     = require('express');  
const mongoose    = require('mongoose');  
const bodyParser  = require('body-parser');  
const cookieParser  = require('cookie-parser');
const path        = require('path');  
const $           = require('jquery');  


mongoose.connect('mongodb+srv://cdaly:210301Cathy@cluster0.otm70ca.mongodb.net/plan2park?retryWrites=true&w=majority' ,{useNewUrlParser:true})  
    .then(()=>console.log('✅ Successfully connected to DB'))  
    .catch((err)=>console.log('❌ DB connection error',err));
    
mongoose.set('strictQuery', true);
  

const app = express();  
  

app.set('view engine','ejs');  
  

app.use(bodyParser.urlencoded({extended:false}));  

app.use(cookieParser());
  

app.use('/jquery',express.static(path.join(__dirname+'/node_modules/jquery/dist/')));  
  

app.use(express.static(path.join(__dirname+'/public')));  
  

app.get('/',(req,res)=>{  
  res.redirect('/plan2park/home');  
});  
  

app.use('/plan2park',require('./routes/pageRouter'));  
app.use('/',require('./routes/pageRouter'));  
  

const PORT  = process.env.PORT || 8080;  
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));