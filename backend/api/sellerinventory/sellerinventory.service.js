var sqlpool = require('../../config/sqlconfig');
const User = require("../../Models/UserModel");
const Product = require("../../Models/ProductModel")

module.exports = {
    getsellerproducts : (body,callBack) => {
      console.log("id is",body);
    Product.find({seller_id: body }, (error, result) => {
    if (error) {
      callBack(error);
    }
    else 
    {
        console.log("results from seller products")
    // console.log(result)
  }
  return callBack(null, result);
  });
},


removeproduct :  (body,callBack) => 
{
  console.log("inside delete cart")
  console.log("body.id",body.id);
 
  Product.updateOne(
    {_id: body.id},
    { $set : { seller_id : "" } },
     (error, result) => {
      console.log(result)
    if (error) {
      callBack(error);
    }
    return callBack(null, result);

      });      
},

updatesellerproduct :(data,callBack)=>{
  Product.updateOne({ _id : data.id }, 
  { "$set": 
    {
      name: data.name,
      category: data.category,
      description: data.description,
      view_count: data.count,
      price: data.price,
    }  
  },  (error, results) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  }
  );
},

searchproductinventory: (data, callBack) => {
  console.log("data in search",data.category)
  console.log(data.name)
  let filter = {};
  if (data.category == 'All') filter = {
    name: { "$regex": data.name, "$options": "i" },
    seller_id : {"$regex" : data.seller_id, "$options" : "i"}
  }
  else {
    filter = {
      seller_id : {"$regex" : data.seller_id, "$options" : "i"},
      name:  { "$regex": data.name, "$options": "i" },
      category: { "$regex": data.category, "$options": "i" },
    }
  }
  Product.find(filter, (error, result) => {
    if (error) {
      callBack(error);
    }
    console.log(result);
    return callBack(null, result);
  });
},





}