const {
    signup,
} = require("./signup.service");

const jwt = require('jsonwebtoken');
const { secret } = require('../../config/configValues');
var kafka = require('../../kafka/client');

console.log('req');
module.exports = {
    signup: (req, res) => {
        body = req.body
        signup(body, (err, results) => {
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