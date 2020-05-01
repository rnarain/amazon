const {
    orders,
} = require("./orders.service");

const jwt = require('jsonwebtoken');
const { secret } = require('../../config/configValues');
var kafka = require('../../kafka/client');

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
    }
}