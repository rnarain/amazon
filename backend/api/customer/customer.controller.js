const {
    getCustomerDetails
  } = require("./customer.service");
  
  const jwt = require('jsonwebtoken');
  const { secret } = require('../../config/configValues');
  var kafka = require('../../kafka/client');
  
  
  module.exports = {
    getCustomerDetails: (req, res) => {
      var queryObject = req.query;
      console.log('IN controller ', queryObject);
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

  
  }