var sqlpool = require('../../config/sqlconfig');
const User = require("../../Models/UserModel");
const products = require("../../Models/ProductModel")

module.exports = {
    getsellerproducts : (body,callBack) => {
    //   console.log("id is",body);
    products.find({seller_id: '5ea4c57c89f77fce1106f' }, (error, result) => {
    if (error) {
      callBack(error);
    }
    else 
    {
        console.log("results from seller products")
    console.log(result)
    // console.log(result[0].cart);
    // console.log(result[0].cart[0].ratings)

    // console.log(result[0].cart.length)
    
   
  }
  return callBack(null, result);
  });
},



}