const {
  getallitemsincart,
  deleteproduct,
  updatequantity,
  addtocart,
  saveforlater,
  updategiftorder,
  checkoutcart,
  updategiftmsg
  } = require("./cart.service");
  
  const jwt = require('jsonwebtoken');
  const { secret } = require('../../config/configValues');
  var kafka = require('../../kafka/client');
  
  module.exports = {
    
    getallitemsincart: (req, res) => {
      const body = req.params.id;
      console.log("body",body)

      getallitemsincart(body,(err, results) => {
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



    deleteproduct: (req, res) => {
      const body = req.body;
      console.log("body",body)

      deleteproduct(body,(err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        else
        {
          console.log("the results are",results)
        return res.json({
          success: 1,
          data: results
        });
        }
      });
    },


    updatequantity: (req, res) => {
      const body = req.body;
      console.log("body",body)

      updatequantity(body,(err, results) => {
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



    addtocart: (req, res) => {
      const body = req.body;
      console.log("body",body)

      addtocart(body,(err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        else
        {
          console.log("the results are",results)
        return res.json({
          success: 1,
          data: results
        });
        }
      });
    },
    
    saveforlater: (req, res) => {
      const body = req.body;
      console.log("body",body)

      saveforlater(body,(err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        else
        {
          console.log("the results are",results)
        return res.json({
          success: 1,
          data: results
        });
        }
      });
    },


    updategiftorder: (req, res) => {
      const body = req.body;
      console.log("body",body)

      updategiftorder(body,(err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        else
        {
          console.log("the results are",results)
        return res.json({
          success: 1,
          data: results
        });
        }
      });
    },

    checkoutcart: (req, res) => {
      const body = req.body;
      console.log("body",body)

      checkoutcart(body,(err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        else
        {
          console.log("the results are",results)
        return res.json({
          success: 1,
          data: results
        });
        }
      });
    },
    
    updategiftmsg: (req, res) => {
      const body = req.body;
      console.log("body",body)

      updategiftmsg(body,(err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        else
        {
          console.log("the results are",results)
        return res.json({
          success: 1,
          data: results
        });
        }
      });
    }

  }