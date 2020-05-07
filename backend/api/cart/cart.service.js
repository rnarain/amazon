var sqlpool = require('../../config/sqlconfig');
const User = require("../../Models/UserModel");
var kafka = require('../../kafka/client');

module.exports = {

  getallitemssql: (callBack) => {

    const params = {
      path: 'get-all-items-sql'
    }

    kafka.make_request('cart', params, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });

    // console.log('Inside  users cart ');

    // const getcast = 'SELECT * FROM amazondb.order';
    // sqlpool.query(getcast, (err, result) => {
    //   if (err) {
    //     callBack(error);
    //   } else (result.length > 0)
    //   {
    //     console.log(result);
    //     return callBack(null, result);
    //   }
    // });
  },

  getallitemsincart: (body, callBack) => {

    const params = {
      body: body,
      path: 'get-all-items-in-cart'
    }

    kafka.make_request('cart', params, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });


    // console.log("id is", body);
    // User.find({ _id: body }, (error, result) => {
    //   if (error) {
    //     callBack(error);
    //   }
    //   else {

    //     result = {
    //       cartvalues: result[0].cart,
    //       userdetails: result
    //     }
    //   }
    //   return callBack(null, result);
    // });
  },


  deleteproduct: (body, callBack) => {

    const params = {
      body: body,
      path: 'delete-product'
    }

    kafka.make_request('cart', params, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });




    // console.log("inside delete product")
    // console.log("body.total", body.totalamt)
    // console.log("body.saveforlater", body.savedforlater)
    // User.updateOne(
    //   { _id: body.id },
    //   { $pull: { "cart": { product_id: body.product_id } } },
    //   (error, result) => {
    //     console.log(result)
    //     if (error) {
    //       callBack(error);
    //     }
    //     return callBack(null, result);

    //   });

    // if (!body.savedforlater) {
    //   console.log("this is a acart product")
    //   User.updateOne(
    //     { _id: body.id },
    //     { $set: { total_cart_value: body.totalamt } },
    //     (error, result) => {
    //       console.log("updating tot ammt", result)
    //       if (error) {
    //         callBack(error);
    //       }
    //     }
    //   );
    // }

  },



  updatequantity: (body, callBack) => {


    const params = {
      body: body,
      path: 'update-quantity'
    }

    kafka.make_request('cart', params, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });



    // console.log("body in update quantity", body)
    // User.updateOne({ _id: body.id, 'cart.product_id': body.product_id },
    //   {
    //     "$set":
    //     {
    //       'cart.$.product_count': body.count,
    //       'cart.$.total_value': body.totalvalue,
    //       'total_cart_value': body.total_cart_value
    //     }
    //   }, (error, results) => {
    //     if (error) {
    //       callBack(error);
    //     }
    //     return callBack(null, results);
    //   }
    // );
  },


  addtocart: (data, callBack) => {

    const params = {
      data: data,
      path: 'add-to-cart'
    }

    kafka.make_request('cart', params, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });


    // console.log("data is", data)
    // var totalamt = data.price * product_count;
    // var newItem = {
    //   userid: data.id,
    //   cart: {
    //     product_id: data.product_id,
    //     product_name: data.productname,
    //     category: data.category,
    //     description: data.description,
    //     seller_id: data.seller_id,
    //     seller_name: data.seller_name,
    //     product_count: data.product_count,
    //     total_value: data.total_value,
    //     price: data.price,
    //     isagift: data.isagift,
    //     giftmessage: data.giftmessage,
    //     saveforlater: false,
    //     image: data.image
    //   }
    // };

    // User.update({ _id: newItem.userid }, { $push: { cart: newItem.cart } }, { upsert: false }, (error, results) => {
    //   if (error) {
    //     callBack(error);
    //   }
    //   console.log("from adding", results)
    //   return callBack(null, results);
    // }
    // );
  },


  saveforlater: (body, callBack) => {

    const params = {
      body: body,
      path: 'save-for-later'
    }

    kafka.make_request('cart', params, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });


    // console.log("body in update quantity", body)
    // User.updateOne({ _id: body.id, 'cart.product_id': body.product_id },
    //   {
    //     "$set":
    //     {
    //       'cart.$.saveforlater': body.saveforlater
    //     }
    //   }, (error, results) => {
    //     if (error) {
    //       callBack(error);
    //     }
    //     // return callBack(null, results);
    //   }
    // );


    // User.updateOne(
    //   { _id: body.id },
    //   { $set: { total_cart_value: body.totalamt } },
    //   (error, result) => {
    //     console.log("updating tot ammt", result)
    //     if (error) {
    //       callBack(error);
    //     }
    //     return callBack(null, result);
    //   });
  },


  updategiftorder: (body, callBack) => {

    const params = {
      body: body,
      path: 'update-gift-order'
    }

    kafka.make_request('cart', params, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });


    // console.log("body in update gift order", body)
    // User.updateOne({ _id: body.id, 'cart.product_id': body.product_id },
    //   {
    //     "$set":
    //     {
    //       'cart.$.isagift': body.isagift,
    //       'cart.$.giftmessage': body.giftmessage,
    //       'cart.$.price': body.price,
    //       'cart.$.total_value': body.total_value,
    //       total_cart_value: body.total_cart_value
    //     }
    //   }, (error, results) => {
    //     if (error) {
    //       callBack(error);
    //     }
    //     return callBack(null, results);
    //   }
    // );
  },


  updategiftmsg: (body, callBack) => {

    const params = {
      body: body,
      path: 'update-gift-msg'
    }

    kafka.make_request('cart', params, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });

    // console.log("body in update gift message", body)
    // User.updateOne({ _id: body.id, 'cart.product_id': body.product_id },
    //   {
    //     "$set":
    //     {
    //       'cart.$.giftmessage': body.msg,
    //     }
    //   }, (error, results) => {
    //     if (error) {
    //       callBack(error);
    //     }
    //     return callBack(null, results);
    //   }
    // );
  },

  checkoutcart: (data, callBack) => {



  },

  deletecart: (body, callBack) => {

    const params = {
      body: body,
      path: 'delete-cart'
    }

    kafka.make_request('cart', params, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });


    console.log("inside delete cart", body)
    // return callBack(null, "Success");
    User.update(
      { _id: body.id },
      { $pull: { cart: { $exists: true } } },
      (error, result) => {
        console.log(result)
        if (error) {
          callBack(error);
        }
        return callBack(null, result);
      });
  }



}