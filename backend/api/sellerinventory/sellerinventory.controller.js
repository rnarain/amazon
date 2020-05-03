const {
    getsellerproducts
    } = require("./sellerinventory.service");
    
    const jwt = require('jsonwebtoken');
    const { secret } = require('../../config/configValues');
    var kafka = require('../../kafka/client');
    
    module.exports = {
      
        getsellerproducts: (req, res) => {
        const body = req.params.id;
        console.log("body",body)
  
        getsellerproducts(body,(err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          else
          {
            // console.log("the results are",results)
          return res.json({
            success: 1,
            data: results
          });
          }
        });
      },
  
  
  
     
    }