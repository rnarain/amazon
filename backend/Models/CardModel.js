const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cardSchema = new Schema({
  userid : {type: String, required: true},
  card : 
  [{
      cardType : String,
      cardname : String,
      cardnumber : Number,
      cvv : Number,
      expirydate : Date,
  }],
},
{
    versionKey : false
});


module.exports = mongoose.model('cards', cardSchema);