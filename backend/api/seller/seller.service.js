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

    getAllSellers: (callBack) => {
        User.find({ userType: 'Seller' }, (error, result) => {
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
    },

    updateProfile: (data, callBack) => {

        User.findOne({ name: data.name, userType: 'Seller' }, (error, result) => {
            if (result && result._id != data.id) {
                console.log("Name already exists.")
                return callBack(null, 'Name Already Exists')
            }
            else {
                User.updateOne({ _id: data.id }, { $set: { name: data.name, address: data.address, profile_pic: data.profile_pic } }, (error, result) => {
                    if (error) {
                        callBack(error);
                    }
                    // console.log('result of updateProfile in user :', result);
                    return callBack(null, result);
                })
            }
        })

    },

}
