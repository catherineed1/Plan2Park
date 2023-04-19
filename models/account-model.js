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

module.exports.getUser = (cb) => {
    userAccountlModel.find((err, userData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, userData);
        }
    });
}


