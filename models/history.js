const mongoose = require('mongoose');
const config = require('../config/database');

const HistorySchema = mongoose.Schema({
    CustomerId: {
        type: String,
        required: true
    },
    CustomerName : {
        type: String,
        required: true
    },
    Content : {
        type: String,
        required: true
    },
    SentBy : {
        type: String,
        required: true
    },
    DateTime : {
        type: Date,
        required: true
    }
});

const History = module.exports = mongoose.model('History', HistorySchema);

module.exports.insertHistory = function(customerId, customerName, content, sentBy, callback) {
    let newHistory = new History();
    newHistory.CustomerId = customerId;
    newHistory.CustomerName = customerName;
    newHistory.Content = content;
    newHistory.SentBy = sentBy;
    newHistory.DateTime = new Date();
    newHistory.save(callback);
}

module.exports.getHistoryByCustomerId = function(customerId, callback) {
    const query = {CustomerId: customerId}
    History.find(query, callback);
}

module.exports.getAllCustomerId = function(callback) {
    History.distinct("CustomerId", (err, arr) => {
        callback(err, arr);
    });
}

