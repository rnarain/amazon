const User = require("../../Models/UserModel");

module.exports = {
  // createUser : (data, callBack) => {
  //   console.log("reached here ",data);
  //   var newUser = new User({
  //     card : {
  //       cardtype : data.cardtype,
  //       cardname : data.cardname,
  //       cardnumber : data.cardnumber,
  //       cvv : data.cvv,
  //       expirydate : data.expirydate
  //     }
  //   });
  //   User.findById({ data.id }, (error, user) => {
  //     if (error) {
  //       callBack(error);
  //     }
  //     if (!user) {
  //       newCard.save((error, data) => {
  //         if (error) {
  //           callBack(error);
  //         }
  //         console.log(data);
  //         return callBack(null, data);
  //       })
  //     } 
  //   })
  // },


  addCard : (data, callBack) => {
    let newData = {
      cardtype : data.cardtype,
      cardname : data.cardname,
      cardnumber : data.cardnumber,
      cvv : data.cvv,
      expirydate : data.expirydate
    }
    User.updateOne({ _id : data.id }, { $push : { cards : newData }  }, { upsert: false }, (error, results) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
    );
  },

  updateCard :(data,callBack)=>{
    User.updateOne({ _id : data.id , 'cards._id' : data.cardid}, 
    { "$set": 
      {
        'cards.$.cardtype': data.cardtype,
        'cards.$.cardname': data.cardname,
        'cards.$.cardnumber': data.cardnumber,
        'cards.$.cvv': data.cvv,
        'cards.$.expirydate': data.expirydate,
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
    User.update({ _id: data.id },
      { "$pull": { 'cards': { _id : data.cardid } } },
      (error, result) => {
   
    if (error) {
      callBack(error);
    }
    return callBack(null, result);
  });
},

getCardDetails: (cardid , callBack) => {
  User.findOne({'cards._id' : cardid} , (error, result) => {
    if (error) {
      callBack(error);
    }

    if (!result || result.cards.length <=0) {
      callBack(null, "Card Not found");
    }
    const cards = result.cards;

    cards.forEach(element => {
      if (element._id == cardid) {
        return callBack(null, element);
      }
    });
  });
},


getAllCards : (id,callBack) => {
    User.findById({_id : id},
      (error, result) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, result.cards);
      }
    );
  },
}

















































