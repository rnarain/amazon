const {
  addAddress,
  deleteAddress,
  updateAddress,
  getAllAddress,
  getAddressDetails
} = require("./address.service");

const jwt = require('jsonwebtoken');
const { secret } = require('../../config/configValues');
var kafka = require('../../kafka/client');

module.exports = {
  // createAddress: (req, res) => {
  //   const body = req.body;
  //   createAddress(body, (err, results) => {
  //     if (err) {
  //       return res.status(400).json({
  //         success: 0,
  //         message: err
  //       });
  //     }
  //     return res.status(200).json({
  //       success: 1,
  //       data: results,
  //       message: "Address saved successfully"
  //     });
  //   });
  // },
  getAddressDetails: (req , res) => {
    const cardid = req.params.addressid;
    getAddressDetails(cardid, (err, results) => {
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


  addAddress : (req, res) => {
    const body = req.body;
    addAddress(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  updateAddress : (req, res) => {
    const body = req.body;
    updateAddress(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  deleteAddress: (req, res) => {
    const body = req.body;
    deleteAddress(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },


  getAllAddress: (req, res) => {
    console.log("GetAllAddress ", req);
    const id = req.params.id;
    getAllAddress(id,(err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
}