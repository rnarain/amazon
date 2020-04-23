const Card = require("../../Models/CardModel");

module.exports = {
  createCard : (data, callBack) => {
    console.log("reached here ",data);
    var newCard = new Card({
      userid : data.id,
      card : [{
        cardtype : data.cardtype,
        cardname : data.cardname,
        cardnumber : data.cardnumber,
        cvv : data.cvv,
        expirydate : data.expirydate
      }]
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

  // getCardDetails: (id, callBack) => {
  //   console.log(id);
  //   Card.findById(id , (error, result) => {
  //     if (error) {
  //       console.log(error);
  //       callBack(error);
  //     }
  //     console.log("Result inside getCardDetails",result);
  //     return callBack(null, result);
  //   });
  // },

  addCard : (data, callBack) => {
    let newData = {
      cardtype : data.cardtype,
      cardname : data.cardname,
      cardnumber : data.cardnumber,
      cvv : data.cvv,
      expirydate : data.expirydate
    }
    Card.updateOne({ userid : data.id }, { $push : { card : newData }  }, { upsert: false }, (error, results) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
    );
  },

  updateCard :(data,callBack)=>{
    console.log("reached ", data);
    Card.updateOne({ 'userid' : data.id , 'card._id' : data.cardid}, 
    { "$set": 
      {
        'card.$.cardtype': data.cardtype,
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
      { "$pull": { 'card': { _id : data.cardid } } },
      (error, result) => {
   
    if (error) {
      callBack(error);
    }
    return callBack(null, result);
  });
},

getAllCards : (id,callBack) => {
    Card.findOne({userid : id},
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
}















































