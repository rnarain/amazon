const User = require("../../Models/UserModel");
//Imported for jwt 
const jwt = require('jsonwebtoken');
const { secret } = require("../../config/configValues");
const { auth } = require("../../config/passport");
const { checkAuth } = require("../../config/passport");
const productModel = require("../../Models/ProductModel");

var sqlpool = require('../../config/sqlconfig');


module.exports = {
  
  orders: (req, res) => {

    var orderObj;
    const getcast = 'SELECT * FROM amazondb.order INNER JOIN amazondb.productandorders ON order.orderid = productandorders.orderid Where order.userid = "' +  req.body.userid + '"';

    sqlpool.query(getcast, (error, result) => {
      console.log("in orders")
      if (error) {
        console.log(error);
        //callBack(error);
      } else {
        
        if (result && result != null) {
          console.log(result);
          orderObj = result;
          
          var productList = [];
          for(var eachOrderId of orderObj){
            productList.push(eachOrderId.productid);
          }
        
          //Get mongo data
          productModel.find({'_id': { $in: productList }} , (error, productResult) => {
            var orderDetailsMap = new Map();

            var productMap = new Map(productResult.map(i => [i._id.toString(), i]));
            console.log('productMap',productMap);


           /* for(var eachOrder of orderObj){
                if(productMap.has(eachOrder.productid)){
                  orderObj['productDetails'] = productMap.get(eachOrder.productid);
                }
            }*/
            
           

            orderObj.forEach((eachOrder, index)=> {
              console.log('1',eachOrder);
              //if(productMap.has(eachOrder.productid)){
                console.log('typeof',eachOrder);

                eachOrder['productDetails'] = productMap.get(eachOrder.productid);
                //console.log('2',eachOrder);
             // }
            });


            console.log('orderObj',orderObj);
            
            for(var eachOrder of orderObj){
              if(orderDetailsMap && orderDetailsMap.has(eachOrder.orderid)){
                //let list = orderDetailsMap.get(orderObj.orderid).produ;
                let tempList = orderDetailsMap.get(eachOrder.orderid).productDetailList.push(eachOrder.productDetails);
              }else{
                  var productList = [];
                  productList.push(eachOrder.productDetails);
                  
                  let eachOrderDetailObj = eachOrder;
                  eachOrderDetailObj.productDetailList = productList;

                  orderDetailsMap.set(eachOrder.orderid,eachOrderDetailObj);
              }
            }
            res.body = orderDetailsMap;
            var arrayList = Array.from( orderDetailsMap.values() );
            return res.send(arrayList);
          });

          //for(productModel)

          //res.body = user;
          //return res.send(result);
        } else {
          res.writeHead(401, {
            'Content-Type': 'text/plain'
          })
          console.log('invalid');
          res.end("Invalid Credentials");
        }
      }

    });
  }
}
