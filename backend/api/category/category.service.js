const Category = require("../../Models/CategoryModel");
const Product = require("../../Models/ProductModel");


module.exports = {

  getAllCategories: (callBack) => {
    Category.find({},{category:1, _id:0}, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });
  },


  deleteCategory: (data, callBack) => {
    console.log(data);
   
  },
}
