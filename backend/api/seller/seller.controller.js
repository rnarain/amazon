const {
    getSellerDetails, getSellerProducts , getAllSellers,
    updateProfile ,getSellerMonthlySales, getSellerStatistics,
  } = require("./seller.service");
  
  const jwt = require('jsonwebtoken');
  const { secret } = require('../../config/configValues');
  var kafka = require('../../kafka/client');
  
  
  module.exports = {
    getSellerDetails: (req, res) => {
      var queryObject = req.query;
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

    getAllSellers: (req, res) => {
      getAllSellers((err, results) => {
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
    getSellerMonthlySales: (req, res) => {
      let id = req.params.id;
      getSellerMonthlySales(id,(err, results) => {
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

    getSellerProducts: (req, res) => {
      var queryObject = req.query;
      getSellerProducts(queryObject, (err, results) => {
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

    getSellerStatistics : (req,res) => {
      var queryObject = req.query;
      getSellerStatistics(JSON.parse(queryObject.data), (err, results) => {
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