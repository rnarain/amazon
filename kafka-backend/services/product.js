const Product = require('../Models/ProductModel');

function handle_request(msg, callBack) {
  if (msg.path == "search-product") {
    let filter = msg.data;
    Product.find(filter, (error, result) => {
      if (error) {
        callBack(error);
      }
      console.log(result);
      return callBack(null, result);
    });
  }
};

exports.handle_request = handle_request;