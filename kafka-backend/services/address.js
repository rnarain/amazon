const User = require('../Models/UserModel');

function handle_request(msg, callBack) {
    if (msg.path == 'add-address') {
        const data = msg.data;
        const newData = msg.newData
        User.findOneAndUpdate({ _id: data.id }, { $addToSet: { addresses: newData } }, { new: true }, (error, results) => {
            if (error) {
                callBack(error);
            }//console.log("Address",results);
            if (!results) {
                return callBack(null, { address: null });
            }
            var idx = results.addresses.length;
            var insertedAddress = results.addresses[idx - 1];
            // console.log("Address",results.addresses[idx-1]);
            return callBack(null, { address: insertedAddress });
        });
    }

    if (msg.path == 'update-address') {
        const data = msg.data;
        User.updateOne({ _id: data.id, 'addresses._id': data.addressid },
            {
                "$set":
                {
                    'addresses.$.name': data.name,
                    'addresses.$.streetaddressline_1': data.streetaddressline_1,
                    'addresses.$.streetaddressline_2': data.streetaddressline_2,
                    'addresses.$.country': data.country,
                    'addresses.$.state': data.state,
                    'addresses.$.city': data.city,
                    'addresses.$.zipcode': data.zipcode,
                    'addresses.$.phone': data.phone
                }
            }, (error, results) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

    if (msg.path == 'delete-address') {
        const data = msg.data;
        User.updateOne({ _id: data.id },
            { "$pull": { 'addresses': { _id: data.addressid } } },
            (error, result) => {

                if (error) {
                    callBack(error);
                }
                // console.log("Here",result);
                return callBack(null, result);
            });
    }

    if (msg.path == 'get-address-details') {
        const addressid = msg.addressid;
        User.findOne({ 'addresses._id': addressid }, (error, result) => {
            if (error) {
                callBack(error);
            }

            if (!result || result.addresses.length <= 0) {
                callBack(null, "Address Not found");
            }
            const addresses = result.addresses;

            addresses.forEach(element => {
                if (element._id == addressid) {
                    return callBack(null, element);
                }
            });
        });
    }

    if (msg.path == 'get-all-addresses') {
        const id = msg.id;
        User.findById({ _id: id },
            (error, results) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results.addresses);
            }
        );
    }



};

exports.handle_request = handle_request;