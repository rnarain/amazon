const User = require("../../Models/UserModel");
const Product = require("../../Models/ProductModel");
const client = require("../../config/redisconfig");
const connectionSting = require("../../config/configValues")

const fs = require('fs');
const aws = require('aws-sdk');


module.exports = {
    getCustomerDetails: (data, callBack) => {
        User.findOne({ _id: data._id }, (error, result) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, result);
        })
    },

    upload(req, callBack) {
        console.log('In upload');
        console.log('REQ : ', req)
        aws.config.setPromisesDependency();
        aws.config.update({
            accessKeyId: connectionSting.s3AccessKey,
            secretAccessKey: connectionSting.s3SecretAccessKey,
            region: connectionSting.s3region
        });
        const s3 = new aws.S3();
        var params = {
            ACL: 'public-read',
            Bucket: connectionSting.s3BucketName,
            Body: fs.createReadStream(req.file.path),
            Key: `images/${req.file.originalname}`
        };

        s3.upload(params, (err, data) => {

            if (err) {
                console.log('Error occured while trying to upload to S3 bucket', err);
            }

            if (data) {
                fs.unlinkSync(req.file.path); 
                const locationUrl = data.Location;

                User.updateOne({ _id: req.body.id }, { $set: { profile_pic: req.file.originalname } }, (error, result) => {
                    if (error) {
                        callBack(error);
                    }
                    return callBack(null, result);
                })
            }
        });
    },



    updateProfile: (data, callBack) => {
        console.log('In Customer service ', data);
        User.updateOne({ _id: data.id }, { $set: { name: data.name, profile_pic: data.profile_pic } }, (error, result) => {
            if (error) {
                callBack(error);
            }
            console.log('result of updateProfile in user :', result);
            return callBack(null, result);
        })
    },
}
