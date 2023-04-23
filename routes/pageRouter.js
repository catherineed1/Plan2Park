const express = require('express');
const carBookingModel = require('../models/car-register-model');
const userModel = require('../models/account-model');
const carModel = require('../models/car-model');
const locModel = require('../models/location-model');
const carPoolModel = require('../models/car-pool-model');
const issueReportModel = require('../models/issue-model');
const router = express.Router();

router.get('/home', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('account/login');
});

router.get('/admin', (req, res) => {
    res.render('admin/admin');
});


router.get('/publicTransportMap', (req, res) => {
    res.render('public_transport/publicTransportMap');
});

router.get('/carParkBooking', (req, res) => {
    res.render('car_park_booking/booking');
});

router.get('/createAccount', (req, res) => {
    res.render('account/create_account');
});

router.get('/account', (req, res) => {
    res.render('account/account');
});

router.post('/addCarBooking', (req, res) => {
    const carBookingData = new carBookingModel(req.body);
    carBookingData.save();
    carBookingModel.addCarPool((err, carBookingData) => {
        if (err) {
            res.json({ msg: 'error' });
        }
        else {
            res.json({ data: carBookingData });
        }
    });
});

router.get('/getCarBookings', (req, res) => {
    carBookingModel.getCarPool(req.cookies.loggedInUser, (err, bookingsData) => {
        if (err) {
            res.json({ msg: 'error' });
        } else {
            res.json({ data: bookingsData });
        }
    });
});

router.post('/createAccount', (req, res) => {
    const userData = new userModel(req.body);
    userData.save();
    userModel.createAccount((err, userData) => {
        if (err) {
            res.json({ msg: 'error' });
        }
        else {
            res.json({ data: userData });
        }
    });
});

router.post('/findUser', (req, res) => {
    const loginData = new userModel(req.body);
    userModel.findOne({ username: loginData.username, password: loginData.password }, function (err, result) {
        if (err || !result) {
            res.status(403);
            res.json({ msg: 'error' });
        }else {
            res.cookie('loggedInUser', result._id);
            res.json({ data: result._id });
        }
    });
});

router.get('/getUser', (req, res) => {
    userModel.findById(req.cookies.loggedInUser, (err, userData) => {
        if (err) {
            res.json({ msg: 'error' });
        } else {
            res.json({ data: userData });
        }
    });
});

router.get('/getDriver', (req, res) => {
    userModel.findById(req.query.driverID, (err, userData) => {
        if (err) {
            res.json({ msg: 'error' });
        } else {
            res.json({ data: userData });
        }
    });
});

router.post('/addCar', (req, res) => {
    const carData = new carModel(req.body);
    carData.save();
    carModel.addCar((err, carData) => {
        if (err) {
            res.json({ msg: 'error' });
        }
        else {
            res.json({ data: carData });
        }
    });
});

router.get('/getCars', (req, res) => {
    carModel.find({userID:req.cookies.loggedInUser}, (err, carData) => {
        if (err) {
            res.json({ msg: 'error' });
        } else {
            res.json({ data: carData });
        }
    });
});

router.get('/getUserBookings', (req, res) => {
    carBookingModel.getUserBookings(req.cookies.loggedInUser, (err, UBData) => {
        if (err) {
            res.json({ msg: 'error' });
        } else {
            res.json({ data: UBData });
        }
    });
});

router.get('/getCarPoolBookings', async (req, res) => {
    var cpData = await carPoolModel.find({userID: req.cookies.loggedInUser});
        var bookings = await Promise.all(cpData.map(async (carpool) => {
            var bookingData = await carBookingModel.findOne({_id: carpool.bookingID});
            var driverData = await userModel.findOne({_id: bookingData.userID});
                return {
                    cpID: carpool._id, 
                    bookingID: bookingData._id,
                    driverName: driverData.fullName,
                    pickupLoc: bookingData.pickupLoc,
                    vehicle: bookingData.vehicle,
                    dateOut: bookingData.dateOut,
                    dateIn: bookingData.dateIn
                };
        }));
        res.json({data: bookings});
});

router.get('/countCarPoolBookings', (req, res) => {
    carPoolModel.where({bookingID: req.query.bookingID}).count((err, countData) => {
        if (err) {
            res.json({ msg: 'error' });
        } else {
            res.json({ data: countData });
        }
    });
});

router.delete('/deleteSpaceBooking', (req, res) => {
    console.log(req.body);
    carBookingModel.deleteOne({_id: req.body.bookingId}, (err, spaceData) => {
        if (err) {
            res.json({ msg: 'error' });
        } else {
            res.json({ data: spaceData });
        }
    });
});

router.delete('/deleteCarPoolBooking', (req, res) => {
    console.log(req.body);
    carPoolModel.deleteOne({_id: req.body.carpoolBookingId}, (err, CpData) => {
        if (err) {
            res.json({ msg: 'error' });
        } else {
            res.json({ data: CpData });
        }
    });
});

router.delete('/deleteCar', (req, res) => {
    console.log(req.body.carId);
    carModel.deleteOne({_id: req.body.carId}, (err, carData) => {
        if (err) {
            res.json({ msg: 'error' });
        } else {
            res.json({ data: carData });
        }
    });
});

router.post('/addLocation', (req, res) => {
    const locData = new locModel(req.body);
    locData.save();
    locModel.addLocation((err, locData) => {
        if (err) {
            res.json({ msg: 'error' });
        }
        else {
            res.json({ data: locData });
        }
    });
});

router.get('/getLocations', (req, res) => {
    locModel.find({userID:req.cookies.loggedInUser}, (err, locData) => {
        if (err) {
            res.json({ msg: 'error' });
        } else {
            res.json({ data: locData });
        }
    });
});

router.delete('/deleteLoc', (req, res) => {
    console.log(req.body.locId);
    locModel.deleteOne({_id: req.body.locId}, (err, locData) => {
        if (err) {
            res.json({ msg: 'error' });
        } else {
            res.json({ data: locData });
        }
    });
});

router.post('/addCarPool', (req, res) => {
    const carPoolData = new carPoolModel(req.body);
    console.log(carPoolData);
    carPoolData.save();
    carPoolModel.addCarPool((err, carPoolData) => {
        if (err) {
            res.json({ msg: 'error' });
        }
        else {
            res.json({ data: carPoolData });
        }
    });
});


router.post('/addIssue', (req, res) => {
    const issueData = new issueReportModel(req.body);
    issueData.save();
    issueReportModel.addIssue((err, issueData) => {
        if (err) {
            res.json({ msg: 'error' });
        }
        else {
            res.json({ data: issueData });
        }
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('loggedInUser');
    res.send();
});

module.exports = router; 