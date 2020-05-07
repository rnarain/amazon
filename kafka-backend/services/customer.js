
const User = require('../Models/UserModel');

function handle_request(msg, callBack) {
    if (msg.path == 'get-customer-details') {
        const data = msg.data
        User.findOne({ _id: data._id }, (error, result) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, result);
        })
    }

    if(msg.path == 'update-customer-profile'){
        const data = msg.data;
        User.updateOne({ _id: data.id }, { $set: { name: data.name, profile_pic: data.profile_pic } }, (error, result) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, result);
        })
    }

};

exports.handle_request = handle_request;