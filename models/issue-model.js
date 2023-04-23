const mongoose = require('mongoose');

const issueReportSchema = new mongoose.Schema({
    userID: {
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



