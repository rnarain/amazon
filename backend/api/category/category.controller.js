const {
  getAllCategories,
} = require("./category.service");
const Category = require("../../Models/CategoryModel");
const Product = require("../../Models/ProductModel");



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
    var newCategory = new Category({
      category: req.body.category
    })
      newCategory.save((error , results) => {
        if (error) {
          return res.status(400).json({
            success: 0,
            data: "Category already exists"
          });
        }
        return  res.status(200).json({
          success: 1,
          data: results
        });
      });
  },
  deleteCategory: (req, res) => {
    console.log("ya");
    Product.find({category :  req.body.category} , (error, product) =>{
      console.log(product)
      if(product){
        return res.status(200).json({
          success: 0,
          data: "There are products associated with this category"
        });
      }
      else{
        Category.deleteOne({category : req.body.category},(error, results) => {
          if (error) {
            return res.status(200).json({
              success: 0,
              data: "Couldnot delete category"
            });
          }
           return res.status(200).json({
            success: 1,
            data: results
          });
        }
        );
      }
    });
    
  },
}