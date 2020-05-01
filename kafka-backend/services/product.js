const Product = require('../Models/ProductModel');
const client = require("../../backend/config/redisconfig");
// var kafka = require('../../kafka/client');

function handle_request(msg, callBack) {
  const productSearchRedisKey = 'product_search:details';
  // if (msg.path == "search-product") {
  //   let filter = msg.data;
  //   Product.find(filter, (error, result) => {
  //     if (error) {
  //       callBack(error);
  //     }
  //     console.log(result);
  //     return callBack(null, result);
  //   });
  // }





  if (msg.path == "search-product") {
    let filter = msg.data;
    return client.get(productSearchRedisKey, (err, details) => {
      if (details) {
        console.log('GETTING KEY VALUE ')
        return callBack(null, JSON.parse(details));
      }
      else {


        Product.find(filter, (error, details) => {
          if (error) {
            callBack(error);
          }
          // console.log(details);
          console.log('SETTING KEY VALUE ')
          client.setex(productSearchRedisKey, 3600, JSON.stringify(details))
          return callBack(null, details);
        });

      }
    })
  }
};

exports.handle_request = handle_request;