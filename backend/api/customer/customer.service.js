const Product = require("../../Models/ProductModel");

module.exports = {

  getProductDetails: (data, callBack) => {
      
    Product.find({_id: data._id}, (error, result) => {
      if (error) {
        callBack(error);
      }
      console.log(result);
    return callBack(null, result);
    });
  }

}
