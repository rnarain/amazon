const Product = require('../Models/ProductModel');
const User = require('../Models/UserModel');

function handle_request(msg, callBack) {
    if (msg.path == 'get-seller-products') {
        const body = msg.body;
        Product.find({ seller_id: body }, (error, result) => {
            if (error) {
                callBack(error);
            }
            else {
                console.log("results from seller products")
                // console.log(result)
            }
            return callBack(null, result);
        });
    }
}

exports.handle_request = handle_request