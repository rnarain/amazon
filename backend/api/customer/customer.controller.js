const {
    getProductDetails,
} = require("./customer.service");

const jwt = require('jsonwebtoken');
const { secret } = require('../../config/configValues');
var kafka = require('../../kafka/client');

module.exports = {

    getProductDetails: (req, res) => {
        body = req.query
        getProductDetails(body, (err, results) => {
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