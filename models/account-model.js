const mongoose = require('mongoose');

const userAccountSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    pickupLoc: [{
        nickname: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    }],
    vehicle: [{
        nickname: {
            type: String,
            required: true
        },
        registration: {
            type: String,
            required: true
        }
    }]
});
const userAccountlModel = module.exports = mongoose.model('user-account', userAccountSchema);

module.exports.addUser = (cb, err, userData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, userData);
        };
}

module.exports.getUser = (cb) => {
    userAccountlModel.find((err, formData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, formData);
        }
    });
}
