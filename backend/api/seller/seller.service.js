const User = require("../../Models/UserModel");
const client = require("../../config/redisconfig");

module.exports = {
    getSellerDetails: (data, callBack) => {
        console.log('In seller service ', data);
        User.findOne({ _id: data._id }, (error, result) => {
            if (error) {
                callBack(error);
            }
            console.log('result of query in user :', result);
            return callBack(null, result);
        })
    }

}
