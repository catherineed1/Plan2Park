const mongoose = require('mongoose');

const userLocationSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    street_num: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    }
});
const userLocationsModel = module.exports = mongoose.model('user-locations', userLocationSchema);

module.exports.addLocation = (cb, err, locationData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, locationData);
        };
}

module.exports.getLocations = (cb) => {
    userLocationsModel.find((err, locationData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, locationData);
        }
    });
}


