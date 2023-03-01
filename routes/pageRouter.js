const express    = require('express');  
const carPoolModel  = require('../models/car-pool-register');  
  
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

router.post('/addCarPool',(req,res)=>{  
    const carPool = new carPoolModel({  
        carPool:req.body.task  
    });  
    carPoolModel.addCarPool(carPool,(err,formData)=>{  
        if(err){  
            res.json({msg:'error'});  
        }else{  
            res.json({msg:'success'});  
        }  
    });  
});  

module.exports = router; 