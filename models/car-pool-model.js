const mongoose = require('mongoose');

const carPoolSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    bookingID: {
        type: String,
        required: true
    }
});
const carPoolModel = module.exports = mongoose.model('carpool', carPoolSchema);

module.exports.addCarPool = (cb, err, carPoolData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, carPoolData);
        };
}
