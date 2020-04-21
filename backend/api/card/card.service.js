const Card = require("../../Models/CardModel");
const mongoose = require('mongoose');

module.exports = {
  createCard : (data, callBack) => {
    var newCard = new Card({
      userid : data.id,
      card : {
        cardType : data.cardtype,
        cardname : data.cardname,
        cardnumber : data.cardnumer,
        cvv : data.cvv,
        expirydate : data.expirydate
      }
    });
    Card.findOne({ userid : data.id }, (error, user) => {
      if (error) {
        callBack(error);
      }
      if (!user) {
        newCard.save((error, data) => {
          if (error) {
            callBack(error);
          }
          console.log(data);
          return callBack(null, data);
        })
      }
    })
  },

  getCardDetails: (id, callBack) => {
    Card.findOne({ _id : id }, (error, result) => {
      if (error) {
        callBack(error);
      }
      console.log(result);
      return callBack(null, result);
    });
  },

  addCard : (data, callBack) => {
    let newData = {
      cardType : data.cardType,
      cardname : data.cardname,
      cardnumber : data.cardnumber,
      cvv : data.cvv,
      expirydate : data.expirydate
    }
    Card.update({ userid : data.id }, { $push : { card : newData }  }, { upsert: false }, (error, results) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
    );
  },

  updateCard :(data,callBack)=>{
    data.cardId = mongoose.Types.ObjectId(data.cardId);
    Card.updateOne({ userid : data.id , 'card._id' : data.cardId}, 
    { "$set": 
      {
        'card.$.cardType': data.cardType,
        'card.$.cardname': data.cardname,
        'card.$.cardnumber': data.cardnumber,
        'card.$.cvv': data.cvv,
        'card.$.expirydate': data.expirydate,
      }  
    },  (error, results) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
    );
  },
  
  deleteCard : (data, callBack) => {
    Card.update({ userid: data.id },
      { "$pull": { 'card': { _id : data.cardId } } },
      (error, result) => {
   
    if (error) {
      callBack(error);
    }
    return callBack(null, result);
  });
},

getAllCards : (data,callBack) => {
    Card.findOne({userid : data.id},
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
}
















































// const Card = require("../../Models/CardModel");

// module.exports = {
//   createCard : (data, callBack) => {
//     var newCard = new Card({
//       userid : data.id,
//       card : {
//         'cardType' : data.cardtype,
//         'cardname' : data.cardname,
//         'cardnumber' : data.cardnumer,
//         'cvv' : data.cvv,
//         'expirydate' : data.expirydate
//       }
//     });
//     Card.findOne({'userid': data.id},(error,card) => {
//       if (error) {
//         callBack(error);
//       }
//       if(card){
//         Card.findOne({'card.cardnumber': data.cardnumber},(error,card => {
//           if (error) {
//             callBack(error);
//           }    
//           if(card){
//             return callBack('Card already exists');
//           }
//           else newCard.save((error , data)=>{
//             if(error) {
//               callBack(error);
//             }
//             return callBack(null,data);
//           })
//         }
//       }            
//     })
//   }
// }
