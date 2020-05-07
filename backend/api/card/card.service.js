const User = require("../../Models/UserModel");
var kafka = require('../../kafka/client');

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


  addCard: (data, callBack) => {

    let newData = {
      cardtype: data.cardtype,
      cardname: data.cardname,
      cardnumber: data.cardnumber,
      cvv: data.cvv,
      expirydate: data.expirydate
    }
    const params = {
      newData : newData,
      data: data,
      path: 'add-card'
    }

    kafka.make_request('card', params, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });



    // let newData = {
    //   cardtype: data.cardtype,
    //   cardname: data.cardname,
    //   cardnumber: data.cardnumber,
    //   cvv: data.cvv,
    //   expirydate: data.expirydate
    // }
    // User.findOneAndUpdate({ _id: data.id, 'cards.cardnumber': { $ne: data.cardnumber } },
    //   { $addToSet: { cards: newData } }, { new: true }, (error, results) => {
    //     if (error) {
    //       callBack(error);
    //     }
    //     if (!results) {
    //       return callBack(null, { card: null });
    //     }
    //     var insertedCard;
    //     for (var idx = 0; idx < results.cards.length; idx++) {
    //       var card = results.cards[idx];
    //       if (card.cardnumber === data.cardnumber) {
    //         insertedCard = card;
    //       }
    //     }
    //     return callBack(null, { card: insertedCard });
    //   });
  },

  updateCard: (data, callBack) => {

    const params = {
      data: data,
      path: 'update-card'
    }

    kafka.make_request('card', params, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });

    // User.updateOne({ _id: data.id, 'cards._id': data.cardid },
    //   {
    //     "$set":
    //     {
    //       'cards.$.cardtype': data.cardtype,
    //       'cards.$.cardname': data.cardname,
    //       'cards.$.cardnumber': data.cardnumber,
    //       'cards.$.cvv': data.cvv,
    //       'cards.$.expirydate': data.expirydate,
    //     }
    //   }, (error, results) => {
    //     if (error) {
    //       callBack(error);
    //     }
    //     return callBack(null, results);
    //   }
    // );
  },

  deleteCard: (data, callBack) => {

    const params = {
      data: data,
      path: 'delete-card'
    }

    kafka.make_request('card', params, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });

    // User.update({ _id: data.id },
    //   { "$pull": { 'cards': { _id: data.cardid } } },
    //   (error, result) => {

    //     if (error) {
    //       callBack(error);
    //     }
    //     return callBack(null, result);
    //   });
  },

  getCardDetails: (cardid, callBack) => {

    const params = {
      cardid: cardid,
      path: 'get-card-details'
    }

    kafka.make_request('card', params, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });


    // User.findOne({ 'cards._id': cardid }, (error, result) => {
    //   if (error) {
    //     callBack(error);
    //   }

    //   if (!result || result.cards.length <= 0) {
    //     callBack(null, "Card Not found");
    //   }
    //   const cards = result.cards;

    //   cards.forEach(element => {
    //     if (element._id == cardid) {
    //       return callBack(null, element);
    //     }
    //   });
    // });
  },


  getAllCards: (id, callBack) => {

    const params = {
      id: id,
      path: 'get-all-cards'
    }

    kafka.make_request('card', params, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });

  },
}

















































