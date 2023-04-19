const express    = require('express');  
const carPoolModel  = require('../models/car-register-model');  
const userModel  = require('../models/account-model');  
  
const router = express.Router();  
  
router.get('/home',(req,res)=>{  
 res.render('index');  
});  

router.get('/login',(req,res)=>{  
    res.render('account/login');  
});

router.get('/publicTransportMap',(req,res)=>{  
    res.render('public_transport/publicTransportMap');  
}); 

router.get('/carParkBooking',(req,res)=>{  
    res.render('car_park_booking/booking');  
});  

router.get('/create-account',(req,res)=>{  
    res.render('account/create_account');  
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

router.post('/createAccount',(req,res)=>{  
    const userData = new userModel(req.body);
    userData.save();
    userModel.createAccount((err, userData)=>{
        if(err){
            res.json({msg:'error'});
        }
        else{
            res.json({data:userData});
        }
    });
});  

router.get('/findUser',(req,res)=>{  
    // const loginData = new userModel(req.body);
    let keys = Object.keys(req.body);
    const _username =req.body[keys[0]];
    userModel.findOne({ username: _username }).select("username").lean().then(result => {
        if (result) {
            res.json({msg:'user exists'});
     }
     else{
                res.json({msg:'error'});
       }
    });
    // console.log(req.body[keys[0]]);
    //  const userLogin = {
    //     username: req.body[keys[0]],
    //     password: req.body[keys[1]]
    // };
    // const loginData = new userModel(userLogin);
    // const findUser = userModel.findOne({username: req.body[keys[0]]});
    //     if(findUser){
    //         res.json({msg:'user exists'});
    //     }
    //     else{
    //         res.json({msg:'error'});
    //     }
    

   
// router.post('/createAccount',(req,res)=>{ 
// let keys = Object.keys(req.body);
// console.log(req.body[keys[0]]);

// const user = {
//     username: req.body[keys[0]],
//     password: req.body[keys[1]],
//     fullName: req.body[keys[2]],
//     // address:[{
//     //     line1: req.body[keys[3]],
//     //     line2: req.body[keys[4]],
//     //     town: req.body[keys[5]],
//     //     postcode: req.body[keys[6]],
//     // }],
//     // vehicle:[{
//     //     nickname: req.body[keys[7]],
//     //     registration: req.body[keys[8]]
//     // }]
// }
// console.log(user);
// const userData = new userModel(user);

// userData.save();
// userModel.createAccount((err, userData)=>{
//     if(err){
//         res.json({msg:'error'});
//     }
//     else{
//         res.json({data:userData});
//     }
// });
// });  

router.get('/getUser',(req,res)=>{  
    userModel.getUser((err,userData)=>{  
            if(err){  
                res.json({msg:'error'});  
            }else{  
                res.json({data:userData});  
            }  
    });  
  });  

module.exports = router; 