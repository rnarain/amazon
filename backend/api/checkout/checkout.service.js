const sqlpool = require('../../config/sqlconfig');

module.exports = {

  placeOrder : (orderdetails, callBack) => {
    const card = orderdetails.card;
    const address = orderdetails.address;
    const cart = orderdetails.cart;
    const currentdate = new Date();
    const localDateTime = currentdate.toISOString();
    var results, values;
    var join = '\',\'';
    var totalvalue = 0;
    var totalcount = 0;

    cart.forEach(element => {
      totalcount = totalcount + element.product_count;
      totalvalue =  totalvalue + element.total_value;
      
    });

    try {
      values = '\'' + orderdetails.userid + join + card.cardname + join + card.cardnumber + join + card.cvv +
      join + card.expirydate + join + address.streetaddressline_1 + join + address.streetaddressline_2 +
      join + address.city + join + address.zipcode + join +  address.state + join + address.country +
      join + address.phone + join + localDateTime + join + totalcount + join + totalvalue +
      join + card._id + join + address.name +'\'';

      const placeorder_txn = 'INSERT INTO amazondb.order (userid, cardname, cardnumber, cvv, expirydate, streetaddressline1,'
            + 'streetaddressline2, city, zipcode, state, country, phone, orderdate, totalproducts,'
            + 'totalcost, cardid, addressName)  VALUES('+ values +');'

      // Insert into order table.
      sqlpool.query(placeorder_txn, async (error, result)=> {
        if (error) { 
          throw error;
        }
        const orderid = result.insertId;
        var rowvalue;
        const deliverystatus = "Pending";
        cart.forEach(element => {
          // Insert into product order table
          rowvalue = '\'' +  element.product_id + join +  orderid + join + deliverystatus + join + element.seller_id + join +
                      element.product_count + join + element.price + join + element.isagift + join + element.giftmessage + '\'';
          const productorder_txn = 'INSERT INTO amazondb.productandorders (productid, orderid, deliverystatus, sellerid,'+
          'quantity, productprice, isgift, giftmessage) VALUES(' + rowvalue + ');'
 
          sqlpool.query(productorder_txn, (err, result) => {
            if (err) throw err;
            const productorder_id = result.insertId;
            // Insert into tracking table
            rowvalue =  '\'' + productorder_id + join + deliverystatus + join + localDateTime + '\'';
            const tracking_txn = 'INSERT INTO amazondb.trackingtable (productorderid, deliverystatus, updatedtime)' +
                                  ' VALUES(' + rowvalue + ');'
            sqlpool.query(tracking_txn, (err, result) => {
              if (err) throw err;
            });
          });
        });
      });   
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

















































