const Product = require("../../Models/ProductModel");
const client = require("../../config/redisconfig");

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
    const productDetailsRedisKey = 'product_id:details';

    return client.get(productDetailsRedisKey, (err, details) => {
      if(details){
        console.log('GETTING KEY VALUE')
        return callBack(null, details);
      }
      else{
        Product.findOne({ _id: data._id }, (error, details) => {
          if (error) {
            callBack(error);
          }
          client.setex(productDetailsRedisKey, 3600, JSON.stringify(details))
          console.log('SET KEY VALUE')
          return callBack(null, details);

        });

      }
    })


    // Product.findOne({ _id: data._id }, (error, result) => {
    //   if (error) {
    //     callBack(error);
    //   }
    //   return callBack(null, result);
    // });
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
