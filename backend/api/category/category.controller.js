const {
  getAllCategories,
  addCategory,
} = require("./category.service");

const jwt = require('jsonwebtoken');
const { secret } = require('../../config/configValues');
var kafka = require('../../kafka/client');

module.exports = {
  
  getAllCategories: (req, res) => {
    getAllCategories((err, results) => {
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






  addCategory: (req, res) => {
    const body = req.body;
    addCategory(body, (err, results) => {
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