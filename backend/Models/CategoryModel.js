const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var categorySchema = new Schema({
        category : {type: String, required: true , unique : true}
    }
    ,
{
    versionKey: false
});


module.exports = mongoose.model('category', categorySchema);