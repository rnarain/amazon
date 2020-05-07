const User = require('../Models/UserModel');
var sqlpool = require('../config/sqlconfig');

function handle_request(msg, callBack) {

    if (msg.path == 'get-all-items-sql') {
        const getcast = 'SELECT * FROM amazondb.order';
        sqlpool.query(getcast, (err, result) => {
            if (err) {
                callBack(error);
            } else (result.length > 0)
            {
                return callBack(null, result);
            }
        });
    }

    if (msg.path == 'get-all-items-in-cart') {
        const body = msg.body;

        User.find({ _id: body }, (error, result) => {
            if (error) {
                callBack(error);
            }
            else {
                result = {
                    cartvalues: result[0].cart,
                    userdetails: result
                }
            }
            return callBack(null, result);
        });
    }

    if (msg.path == 'delete-product') {
        const body = msg.body;
        User.updateOne(
            { _id: body.id },
            { $pull: { "cart": { product_id: body.product_id } } },
            (error, result) => {
                console.log(result)
                if (error) {
                    callBack(error);
                }
                return callBack(null, result);

            });

        if (!body.savedforlater) {
            console.log("this is a acart product")
            User.updateOne(
                { _id: body.id },
                { $set: { total_cart_value: body.totalamt } },
                (error, result) => {
                    console.log("updating tot ammt", result)
                    if (error) {
                        callBack(error);
                    }
                }
            );
        }
    }

    if (msg.path == 'update-quantity') {
        const body = msg.body;
        User.updateOne({ _id: body.id, 'cart.product_id': body.product_id },
            {
                "$set":
                {
                    'cart.$.product_count': body.count,
                    'cart.$.total_value': body.totalvalue,
                    'total_cart_value': body.total_cart_value
                }
            }, (error, results) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

    if (msg.path == 'add-to-cart') {
        const data = msg.data;
        var newItem = {
            userid: data.id,
            cart: {
                product_id: data.product_id,
                product_name: data.productname,
                category: data.category,
                description: data.description,
                seller_id: data.seller_id,
                seller_name: data.seller_name,
                product_count: data.product_count,
                total_value: data.total_value,
                price: data.price,
                isagift: data.isagift,
                giftmessage: data.giftmessage,
                saveforlater: false,
                image: data.image
            }
        };

        User.update({ _id: newItem.userid }, { $push: { cart: newItem.cart } }, { upsert: false }, (error, results) => {
            if (error) {
                callBack(error);
            }
            console.log("from adding", results)
            return callBack(null, results);
        }
        );
    }

    if (msg.path == 'save-for-later') {

        const body = msg.body;
        User.updateOne({ _id: body.id, 'cart.product_id': body.product_id },
            {
                "$set":
                {
                    'cart.$.saveforlater': body.saveforlater
                }
            }, (error, results) => {
                if (error) {
                    callBack(error);
                }
                // return callBack(null, results);
            }
        );


        User.updateOne(
            { _id: body.id },
            { $set: { total_cart_value: body.totalamt } },
            (error, result) => {
                console.log("updating tot ammt", result)
                if (error) {
                    callBack(error);
                }
                return callBack(null, result);
            });
    }

    if (msg.path == 'update-gift-order') {

        const body = msg.body;
        User.updateOne({ _id: body.id, 'cart.product_id': body.product_id },
            {
                "$set":
                {
                    'cart.$.isagift': body.isagift,
                    'cart.$.giftmessage': body.giftmessage,
                    'cart.$.price': body.price,
                    'cart.$.total_value': body.total_value,
                    total_cart_value: body.total_cart_value
                }
            }, (error, results) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

    if (msg.path == 'update-gift-msg') {

        const body = msg.body;
        User.updateOne({ _id: body.id, 'cart.product_id': body.product_id },
            {
                "$set":
                {
                    'cart.$.giftmessage': body.msg,
                }
            }, (error, results) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

    if (msg.path == 'delete-cart') {
        const body = msg.body;
        User.update(
            { _id: body.id },
            { $pull: { cart: { $exists: true } } },
            (error, result) => {
                console.log(result)
                if (error) {
                    callBack(error);
                }
                return callBack(null, result);
            });
    }


}
exports.handle_request = handle_request