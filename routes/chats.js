const express = require('express');
const router = express.Router();
const config = require('../config/web-api-ai');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const History = require('../models/history');

const CustomerStore = require('../models/customerStore');
const MessageRouter = require('../connections-handler/messageRouter');

const ApiAi = require('apiai');
const apiAiApp = ApiAi(config.clientkey);

router.get('/customer', (req, res) => {
    res.sendFile(`${__dirname}/static/customer.html`);
})

router.get('/operator', (req, res) => {
    res.sendFile(`${__dirname}/static/operator.html`);
})

router.get('/customers', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    History.getAllCustomerId((err, customers) => {
        if (err) throw err;

        return res.json({
            success: true,
            customers: customers
        });
    });
});

router.get('/history', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    History.getHistoryByCustomerId(req.query["customerId"], (err, chatlogs) => {
        if (err) throw err;
        
        return res.json({
            success: true,
            chatlogs: chatlogs
        });
    });
});

module.exports.Init = function(io) {
    const customerStore = new CustomerStore();
    const messageRouter = new MessageRouter(customerStore, apiAiApp, io.of('/customer'), io.of('/operator'));

    messageRouter.handleConnections();
}

module.exports.chats = router;