const User = require("../../Models/UserModel");
const Product = require("../../Models/ProductModel");
const client = require("../../config/redisconfig");

module.exports = {
    getCustomerDetails: (data, callBack) => {
        User.findOne({ _id: data._id }, (error, result) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, result);
        })
    },

    updateProfile: (data, callBack) => {
        console.log('In Customer service ', data);
        User.updateOne({ _id: data.id }, { $set : {name : data.name, profile_pic : data.profile_pic } } , (error, result) => {
            if (error) {
                callBack(error);
            }
            console.log('result of updateProfile in user :', result);
            return callBack(null, result);
        })
    },
}
