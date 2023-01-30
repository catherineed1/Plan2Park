const express    = require('express');  
const taskModel  = require('../models/task');  
  
const router = express.Router();  
  
router.get('/home',(req,res)=>{  
 res.render('index');  
});  

router.get('/publicTransportMap',(req,res)=>{  
    res.render('public_transport/publicTransportMap');  
}); 

router.get('/carPooling',(req,res)=>{  
    res.render('car_pooling/carPooling');  
});  

router.get('/carParkBooking',(req,res)=>{  
    res.render('car_park_booking/booking');  
});  

router.get('/account',(req,res)=>{  
    res.render('account/account');  
});  

module.exports = router; 