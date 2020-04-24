const Product = require("../../Models/ProductModel");

module.exports = {
  searchProduct: (data, callBack) => {
    let filter = {};
    if (data.category == 'All') filter = {
      name: { "$regex": data.name, "$options": "i" }
    }
    else {
      filter = {
        name: data.name,
        category: data.category
      }
    }
    console.log(filter);
    Product.find(filter, (error, result) => {
      if (error) {
        callBack(error);
      }
      console.log(result);
      return callBack(null, result);
    });
  },

  getProductDetails: (data, callBack) => {

    Product.findOne({ _id: data._id }, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });
  },

  addReview : (data, callBack) => {
    console.log('In service ', data);
    Product.findOneAndUpdate({_id : data.id }, {$set : {ratings : data.ratings}}, { new: true }, (error, result) => {
      if(error){
        callBack(error);
      }
      // console.log(result);
      return callBack(null, result);
    })
  }



}
