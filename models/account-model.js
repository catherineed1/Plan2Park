const mongoose = require('mongoose');

const userAccountSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
});
const userAccountlModel = module.exports = mongoose.model('user-account', userAccountSchema);

module.exports.createAccount = (cb, err, userData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, userData);
        };
}

module.exports.findUserExists = (cb, err, loginData) => {
    if (err) {
        cb(err, null);
    } else {
        cb(null, loginData);
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


