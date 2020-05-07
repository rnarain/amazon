const {
    getsellerproducts,
    removeproduct,
    searchproductinventory,
    updatesellerproduct
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
  
  
      removeproduct: (req, res) => {
        const body = req.body;
        console.log("body",body)
  
        removeproduct(body,(err, results) => {
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

      searchproductinventory: (req, res) => {
        console.log("in search product inventory")
        // var queryObject = url.parse(req.url, true).query;

        console.log(req.query)
       body = req.query

  
        searchproductinventory(body,(err, results) => {
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
 

      updatesellerproduct: (req, res) => {
        var queryObject = req.body;
        console.log(queryObject);

  
        updatesellerproduct(queryObject,(err, results) => {
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