const mongoose = require('mongoose');

const userCarSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    colour: {
        type: String,
        required: true
    },
    registration: {
        type: String,
        required: true
    }
});
const userCarsModel = module.exports = mongoose.model('user-cars', userCarSchema);

module.exports.addCar = (cb, err, carData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, carData);
        };
}

module.exports.getCars = (cb) => {
    userCarsModel.find((err, carData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, carData);
        }
    });
}


