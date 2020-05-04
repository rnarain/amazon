const {
  getCustomerDetails, updateProfile, upload
} = require("./customer.service");

const jwt = require('jsonwebtoken');
const { secret } = require('../../config/configValues');
var kafka = require('../../kafka/client');



module.exports = {
  getCustomerDetails: (req, res) => {
    var queryObject = req.query;
    getCustomerDetails(queryObject, (err, results) => {
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

  upload: (req, res) => {

    upload(req, (err, results) => {
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

  updateProfile: (req, res) => {
    var body = req.body
    updateProfile(body, (err, results) => {
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


}