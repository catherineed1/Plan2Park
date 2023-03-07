const mongoose = require('mongoose');
const mongooseDateFormat = require('mongoose-date-format');

const carPoolSchema = new mongoose.Schema({
    pickupLoc: {
        type: String,
        required: true
    },
    vehicle: {
        type: String,
        required: true
    },
    noOfPassenegers: {
        type: String,
        required: true
    },
    dateOut: {
        type: Date,
        required: true
    },
    dateIn: {
        type: Date,
        required: true
    },
});
carPoolSchema.plugin(mongooseDateFormat);
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
