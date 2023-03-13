const mongoose = require('mongoose');

const userAccountSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    fullName: {
        type: String
    },
    address: [{
        line1: {
            type: String,
            required: true
        },
        line2: {
            type: String,
            required: true
        },
        town: {
            type: String,
            required: true
        },
        postcode: {
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

module.exports.createAccount = (cb, err, userData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, userData);
        };
}

module.exports.getUser = (cb) => {
    userAccountlModel.find((err, userData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, userData);
        }
    });
}
