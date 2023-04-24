const mongoose = require('mongoose');

const issueReportSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    spaceNum: {
        type: String,
        required: true
    },
    issue: {
        type: String,
        required: true
    }
});
const issueReportModel = module.exports = mongoose.model('issue-report', issueReportSchema);

module.exports.addIssue = (cb, err, issueData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, issueData);
        };
}

module.exports.getReportedIssues = (cb) => {
    issueReportModel.find((err, issueData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, issueData);
        }
    });
}



