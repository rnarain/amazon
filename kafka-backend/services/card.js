const User = require('../Models/UserModel');

function handle_request(msg, callBack) {

    if (msg.path == 'add-card') {
        const data = msg.data;
        const newData = msg.newData;

        User.findOneAndUpdate({ _id: data.id, 'cards.cardnumber': { $ne: data.cardnumber } },
            { $addToSet: { cards: newData } }, { new: true }, (error, results) => {
                if (error) {
                    callBack(error);
                }
                if (!results) {
                    return callBack(null, { card: null });
                }
                var insertedCard;
                for (var idx = 0; idx < results.cards.length; idx++) {
                    var card = results.cards[idx];
                    if (card.cardnumber === data.cardnumber) {
                        insertedCard = card;
                    }
                }
                return callBack(null, { card: insertedCard });
            });
    }

    if (msg.path == 'update-card') {
        const data = msg.data;
        User.updateOne({ _id: data.id, 'cards._id': data.cardid },
            {
                "$set":
                {
                    'cards.$.cardtype': data.cardtype,
                    'cards.$.cardname': data.cardname,
                    'cards.$.cardnumber': data.cardnumber,
                    'cards.$.cvv': data.cvv,
                    'cards.$.expirydate': data.expirydate,
                }
            }, (error, results) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

    if (msg.path == 'delete-card') {
        const data = msg.data;
        User.update({ _id: data.id },
            { "$pull": { 'cards': { _id: data.cardid } } },
            (error, result) => {

                if (error) {
                    callBack(error);
                }
                return callBack(null, result);
            });
    }

    if (msg.path == 'get-card-details') {
        
        const cardid = msg.cardid;
        User.findOne({ 'cards._id': cardid }, (error, result) => {
            if (error) {
                callBack(error);
            }

            if (!result || result.cards.length <= 0) {
                callBack(null, "Card Not found");
            }
            const cards = result.cards;

            cards.forEach(element => {
                if (element._id == cardid) {
                    return callBack(null, element);
                }
            });
        });
    }

    if (msg.path == 'get-all-cards') {

        const id = msg.id;
        User.findById({ _id: id },
            (error, result) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, result.cards);
            }
        );
    }
}
exports.handle_request = handle_request