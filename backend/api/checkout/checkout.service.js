const sqlpool = require('../../config/sqlconfig');

module.exports = {

  placeOrder : async (orderdetails, callBack) => {
    const card = orderdetails.card;
    const address = orderdetails.address;
    const currentdate = new Date().toISOString().slice(0,10);
    var results, values;
    var join = '\',\'';
    try {
        for (var idx = 0; idx < orderdetails.cart.length; ++ idx) {
          var element = orderdetails.cart[idx];
          values = '\'' + orderdetails.userid + join + card.cardname + join + card.cardnumber + join + card.cvv +
                    join + card.expirydate + join + address.streetaddressline_1 + join + address.streetaddressline_2 +
                    join + address.city + join + address.zipcode + join +  address.state + join + address.country +
                    join + address.phone + join + currentdate + join + element.product_count + join + element.total_value +
                    join + element.isagift + join + element.giftmessage + join + card._id + '\'';
          
          const placeorder = 'INSERT INTO amazondb.order (userid, cardname, cardnumber, cvv, expirydate, streetaddressline1,'
                    + 'streetaddressline2, city, zipcode, state, country, phone, orderdate, totalproducts,'
                    + 'totalcost, isgift, giftmessage, cardid)  VALUES('+ values +');'

          await sqlpool.query(placeorder);          
        }
      } catch (error) {
        console.log("Exception while placing the order", error);
        callBack(error);
      }
      results = {
                  status : "200",
                  message : "Order placed successfully"
                }
      return callBack(null, results);
  }
}

















































