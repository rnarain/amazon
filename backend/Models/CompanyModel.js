const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var companySchema = new Schema({
        email : {type: String, required: true},
        phone : {type: String, required: true},
        password : {type: String, required: true},
        name : {type: String, required: true},
        city : {type: String, required: true},
        description : {type: String, required: true},
        profilePicURL : String,
    }
    ,
{
    versionKey: false
});


module.exports = mongoose.model('company', companySchema);