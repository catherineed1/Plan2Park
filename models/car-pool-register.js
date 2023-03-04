const mongoose = require('mongoose');

const carPoolSchema = new mongoose.Schema({
    pickupLoc: String,
    vehicle: String,
    noOfPassenegers: String,
    dateOut: {
        type: Date
    },
    dateIn: {
        type: Date
    },
});
const carPoolModel = module.exports = mongoose.model('car-pool-register', carPoolSchema);

module.exports.addCarPool = (cb, err, carPoolData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, carPoolData);
        };
}

module.exports.getCarPool = (cb) => {
    carPoolModel.find((err, formData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, formData);
        }
    });
}

module.exports.removeTask = (id, cb) => {
    taskModel.deleteOne({ '_id': id }, (err, taskData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, taskData);
        }
    });
}  