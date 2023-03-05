const express    = require('express');  
const carPoolModel  = require('../models/car-register-model');  
  
const router = express.Router();  
  
router.post('/addCarPool',(req,res)=>{  
    const carPoolData = new carPoolModel(req.body);
    carPoolData.save();
    carPoolModel.addCarPool((err, carPoolData)=>{
        if(err){
            res.json({msg:'error'});
        }
        else{
            res.json({msg:'success', data:carPoolData});
        }
    });
});  


router.get('/getCarPool',(req,res)=>{  
    carPoolModel.getCarPool((err,formData)=>{  
            if(err){  
                res.json({msg:'error'});  
            }else{  
                res.json({msg:'success',data:formData});  
            }  
    });  
  });  

module.exports = router; 