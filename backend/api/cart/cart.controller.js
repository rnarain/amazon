const {
    getallitems
  } = require("./cart.service");
  
  const jwt = require('jsonwebtoken');
  const { secret } = require('../../config/configValues');
  var kafka = require('../../kafka/client');
  
  module.exports = {
    
    getallitems: (req, res) => {
      getallitems((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        else
        {
        return res.json({
          success: 1,
          data: results
        });
        }
      });
    }

  }