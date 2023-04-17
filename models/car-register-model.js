const mongoose = require('mongoose');
const mongooseDateFormat = require('mongoose-date-format');

const bookingSchema = new mongoose.Schema({
    spaceID: {
        type: String,
        required: true
    },
    pickupLoc: {
        type: String
    },
    vehicle: {
        type: String,
        required: true
    },
    noOfPassenegers: {
        type: String
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
bookingSchema.plugin(mongooseDateFormat);
const carPoolModel = module.exports = mongoose.model('space-booking', bookingSchema);

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
