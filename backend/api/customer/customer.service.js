const User = require("../../Models/UserModel");
const Product = require("../../Models/ProductModel");
const client = require("../../config/redisconfig");

module.exports = {
    getCustomerDetails: (data, callBack) => {
        console.log('In Customer service ', data);
        User.findOne({ _id: data._id }, (error, result) => {
            if (error) {
                callBack(error);
            }
            console.log('result of query in user :', result);
            return callBack(null, result);
        })
    },
}
