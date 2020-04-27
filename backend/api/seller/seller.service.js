const User = require("../../Models/UserModel");
const Product = require("../../Models/ProductModel");
const client = require("../../config/redisconfig");

module.exports = {
    getSellerDetails: (data, callBack) => {
        console.log('In seller service ', data);
        User.findOne({ name: data.name }, (error, result) => {
            if (error) {
                callBack(error);
            }
            console.log('result of query in user :', result);
            return callBack(null, result);
        })
    },

    getSellerProducts: (data, callBack) => {
        console.log('In seller service ', data);
        Product.find({ seller_name: data.name }, (error, result) => {
            if (error) {
                callBack(error);
            }
            console.log('result of query in user :', result);
            return callBack(null, result);
        })
    }

}
