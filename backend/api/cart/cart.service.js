var sqlpool = require('../../config/sqlconfig');
const User = require("../../Models/UserModel");

module.exports = {

  getallitemssql: (callBack) => {
        console.log('Inside  users cart ');
      
        const getcast = 'SELECT * FROM amazondb.order';
        sqlpool.query(getcast, (err, result) => {
          if (err) {
            callBack(error);
          } else (result.length > 0) 
          {
            console.log(result);
            return callBack(null, result);
          } 
        });
},

getallitemsincart : (body,callBack) => {
      console.log("id is",body.id);
  User.find({_id: body.id }, (error, result) => {
    if (error) {
      callBack(error);
    }
    console.log(result)
    console.log(result[0].cart);
    console.log(result[0].cart[0].ratings)

    console.log(result[0].cart.length)
    
    result = {
      cartvalues:result[0].cart,
      userdetails:result
    }

  return callBack(null, result);
  });
},


deleteproduct :  (body,callBack) => 
{
  console.log("inside delete product")
  User.update(
      {_id: body.id},
    { $pull: { "cart" : { product_id: "5e967879668b061d392f4b7e" } } } , (error, result) => {
      console.log(result)
    if (error) {
      callBack(error);
    }
    return callBack(null, result);

      });
},



updatequantity :(body,callBack)=>{
  console.log("body in update quantity",body)
  User.updateOne({ _id : body.id , 'cart.product_id' : body.product_id}, 
  { "$set": 
    {
      'cart.$.product_count': body.count,
      'cart.$.total_value': body.totalvalue,

    }  
  },  (error, results) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  }
  );
},


addtocart : (data,callBack) =>
{
  console.log("data is",data)
 var newItem = {
   userid : data.id,
   cart : {
     product_id : data.product_id,
     product_name : data.productname,
     category  : data.category,
     description  : data.description,
     seller_id : data.seller_id,
     seller_name:data.seller_name,
     product_count:data.product_count,
     total_value:data.total_value,
     price:data.price,
     isagift : data.isagift,
     giftmessage : data.giftmessage,
     saveforlater :false
   }
 };

 User.update({ _id : newItem.userid }, { $push : { cart : newItem.cart }  }, { upsert: false }, (error, results) => {
   if (error) {
     callBack(error);
   }
   console.log("from adding",results)
   return callBack(null, results);
 }
 );
},


saveforlater :(body,callBack)=>{
  console.log("body in update quantity",body)
  User.updateOne({ _id : body.id , 'cart.product_id' : body.product_id}, 
  { "$set": 
    {
      'cart.$.saveforlater': body.saveforlater
    }  
  },  (error, results) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  }
  );
},


updategiftorder :(body,callBack)=>{
  console.log("body in update gift order",body)
  User.updateOne({ _id : body.id , 'cart.product_id' : body.product_id}, 
  { 
    "$set": 
    {
      'cart.$.isagift': body.isagift,
      'cart.$.giftmessage': body.giftmessage,
      'cart.$.price':  body.extraprice,
      'cart.$.total_value': body.extraprice 
    }  
  },  (error, results) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  }
  );
},


checkoutcart : (data,callBack) =>
{
  

},




}