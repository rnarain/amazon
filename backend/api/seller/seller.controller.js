const {
    getSellerDetails
  } = require("./seller.service");
  
  const jwt = require('jsonwebtoken');
  const { secret } = require('../../config/configValues');
  var kafka = require('../../kafka/client');
  
  
  module.exports = {
    getSellerDetails: (req, res) => {
      var queryObject = req.query;
      console.log('IN controller ', queryObject);
      getSellerDetails(queryObject, (err, results) => {
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