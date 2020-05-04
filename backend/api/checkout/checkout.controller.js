const {
  placeOrder
} = require("./checkout.service");

const jwt = require('jsonwebtoken');
const { secret } = require('../../config/configValues');
var kafka = require('../../kafka/client');

module.exports = {

  placeOrder: (req , res) => {
    const orderdetails = req.body;
    placeOrder(orderdetails, (err, results) => {
      if (err) {
        return res.json({success:0});
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  }

}