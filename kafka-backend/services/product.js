const Product = require('../Models/ProductModel');
const User = require('../Models/UserModel');
const client = require("../../backend/config/redisconfig");
// var kafka = require('../../kafka/client');

async function handle_request(msg, callBack) {

  if (msg.path == "search-product") {
    let filter = msg.data;
    Product.find(filter, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });
  }

  if (msg.path == "get-product-details") {
    let data = msg.data;
    Product.findOneAndUpdate({ _id: data._id }, {$inc : {'view_count' : 1}}, (error, result) => {
      if (error) {
        console.log('error')
        callBack(error);
      }
      return callBack(null, result);
    });
  }

  if (msg.path == "get-products-by-category") {
    Product.find({ category: msg.data }, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });
  }

  if (msg.path == "add-review") {
    const data = msg.data;
    Product.findOneAndUpdate({ _id: data.id }, { $set: { ratings: data.ratings } }, { new: true }, (error, result) => {
      if (error) {
        callBack(error);
      }
    })

    var userRating = {
      product_id: data.id,
      product_name: data.name,
      stars: data.ratings[data.ratings.length - 1].stars,
      comment: data.ratings[data.ratings.length - 1].comment
    }


    User.findOneAndUpdate({ _id: data.ratings[data.ratings.length - 1].user_id }, { $push: { ratings: userRating } }, { upsert: true }, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    })
  }

  if (msg.path == "add-product") {
    const data = msg.data;
    await Product.create({ name: data.name, description: data.description, price: data.price, category: data.category, seller_id: data.seller_id, seller_name: data.seller_name, images: data.images }, (error, results) => {
      if (error)
        callBack(error);

      return callBack(null, results);
    });
  }
  // if (msg.path == "search-product") {
  // const productSearchRedisKey = 'product_search:details';
  //   let filter = msg.data;
  //   return client.get(productSearchRedisKey, (err, details) => {
  //     if (details) {
  //       console.log('GETTING KEY VALUE ')
  //       return callBack(null, JSON.parse(details));
  //     }
  //     else {


  //       Product.find(filter, (error, details) => {
  //         if (error) {
  //           callBack(error);
  //         }
  //         // console.log(details);
  //         console.log('SETTING KEY VALUE ')
  //         client.setex(productSearchRedisKey, 3600, JSON.stringify(details))
  //         return callBack(null, details);
  //       });

  //     }
  //   })
  // }
};

exports.handle_request = handle_request;