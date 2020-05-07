const {
    orders,
    cancelOrders,
    getTrackingDetails,
} = require("./orders.service");

const jwt = require('jsonwebtoken');
const { secret } = require('../../config/configValues');
var kafka = require('../../kafka/client');
var sqlpool = require('../../config/sqlconfig');


console.log('req');
module.exports = {
    orders: (req, res) => {
        body = req.body
        orders(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    cancelOrders: (req, res) => {
        body = req.body
        cancelOrders(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    getTrackingDetails: (req, res) => {
        body = req.body
        getTrackingDetails(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    }
}