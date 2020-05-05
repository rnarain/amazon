const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, default: '' },
    seller_id: { type: String, required: true },
    seller_name: { type: String, required: true },
    view_count: { type: Number, default: 0 },
    price: { type: Number, required: true },
    images: [{ file_name: String }],
    deliverystatus: { type: String },
    id:{type:String},//Orderandproduct tables id
    ratings: [{
        stars: Number,
        comment: String,
        user_id: String,
        user_name: String,
    }]

})

module.exports = mongoose.model('product', productSchema);