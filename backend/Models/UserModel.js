const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    // _id: {type: Schema.ObjectId, auto: true },
    email : {type: String, required: true},
    name : {type: String, required: true}, //To be unique for seller
    password : {type: String, required: true},
    userType: {type: String, required: true},
    cart : 
    [{
        product_id : {type:String},
        product_name : {type: String},
        category :  {type:String},
        description :  {type:String},
        seller_id :  {type:String},
        seller_name : {type:String},
        product_count:{type:Number},
        total_value : {type : Number},
        price: {type:Number},
        isagift : {type:Boolean},
        giftmessage : {type:String},
        images: [{ file_name: String }],
   ratings: 
   [{
        stars: {type:Number},
        comment: {type:String},
        user_id: {type:String},
        user_name: {type:String}
    }],
    saveforlater : {type:Boolean}
    }]
}
,
{
    versionKey: false
});

module.exports = mongoose.model('users', userSchema);