const mongoose = require('mongoose');
const mongooseDateFormat = require('mongoose-date-format');

const bookingSchema = new mongoose.Schema({
    spaceID: {
        type: String,
        required: true
    },
    userID: {
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
const carBookingModel = module.exports = mongoose.model('space-booking', bookingSchema);

module.exports.addCarPool = (cb, err, carPoolData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, carPoolData);
        };
}

module.exports.getCarPool = (user_ID, cb) => {
    carBookingModel.find({userID: { $ne: user_ID }}, (err, formData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, formData);
        }
    });
}

module.exports.getUserBookings = (user_ID, cb) => {
    carBookingModel.find({userID: user_ID}, (err, formData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, formData);
        }
    });
}
