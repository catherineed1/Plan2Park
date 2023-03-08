const express    = require('express');  
const carPoolModel  = require('../models/car-register-model');  
const userModel  = require('../models/caccount-model');  
  
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
    const carPoolData = new carPoolModel(req.body);
    carPoolData.save();
    carPoolModel.addCarPool((err, carPoolData)=>{
        if(err){
            res.json({msg:'error'});
        }
        else{
            res.json({data:carPoolData});
        }
    });
});  

router.get('/getCarPool',(req,res)=>{  
    carPoolModel.getCarPool((err,formData)=>{  
            if(err){  
                res.json({msg:'error'});  
            }else{  
                res.json({data:formData});  
            }  
    });  
  });  

router.post('/addUser',(req,res)=>{  
    const userData = new userModel(req.body);
    userData.save();
    userData.addUser((err, userData)=>{
        if(err){
            res.json({msg:'error'});
        }
        else{
            res.json({data:userData});
        }
    });
  });  

router.get('/getUser',(req,res)=>{  
    userModel.getUser((err,formData)=>{  
            if(err){  
                res.json({msg:'error'});  
            }else{  
                res.json({data:formData});  
            }  
    });  
  });  

module.exports = router; 