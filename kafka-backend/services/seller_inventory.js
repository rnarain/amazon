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

    if (msg.path == 'remove-product') {

        const body = msg.body;

        Product.updateOne(
            { _id: body.id },
            { $set: { seller_id: "" } },
            (error, result) => {
                console.log(result)
                if (error) {
                    callBack(error);
                }
                return callBack(null, result);

            });
    }

    if (msg.path == 'update-seller-product') {

        const data = msg.data;
        Product.updateOne(
            { _id: data.id },
            {
                $set:
                {
                    name: data.name,
                    category: data.category,
                    description: data.description,
                    price: data.price,

                }
            }, (error, results) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

    if (msg.path == 'search-product-inventory') {
        
        const data = msg.data;
        let filter = {};
        if (data.category == 'All') filter = {
            name: { "$regex": data.name, "$options": "i" },
            seller_id: { "$regex": data.seller_id, "$options": "i" }
        }
        else {
            filter = {
                seller_id: { "$regex": data.seller_id, "$options": "i" },
                name: { "$regex": data.name, "$options": "i" },
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
    }
}

exports.handle_request = handle_request