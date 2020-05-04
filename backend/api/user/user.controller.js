const {
    getUserDetails,
} = require("./user.service");

const jwt = require('jsonwebtoken');
const { secret } = require('../../config/configValues');
var kafka = require('../../kafka/client');

console.log('req');
module.exports = {
    getUserDetails: (req, res) => {
        id = req.params.id
        getUserDetails(id, (err, results) => {
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