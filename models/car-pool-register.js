const mongoose = require('mongoose');

const carPoolSchema = new mongoose.Schema({
    pickupLoc: String,
    vehicle: String,
    noOfPassenegers: Number,
    dateOut: {
        type: Date,
        default: Date.now,
    },
    dateIn: {
        type: Date,
        default: Date.now,
    },
});

const carPoolModel = module.exports = mongoose.model('car-pool-register', carPoolSchema);

module.exports.addCarPool = (carPoolSchema, cb) => {
    carPoolSchema.save((err, formData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, formData);
        }
    });
}

module.exports.getTask = (cb) => {
    carPoolModel.find((err, taskData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, taskData);
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