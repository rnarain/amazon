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
    var getcast;
    if(req.body.type == "All"){
      getcast = 'SELECT * FROM amazondb.order INNER JOIN amazondb.productandorders ON order.orderid = productandorders.orderid Where order.userid = "' +  req.body.userid + '"';

    }else if(req.body.type == "Open"){
      getcast = 'SELECT * FROM amazondb.order INNER JOIN amazondb.productandorders ON order.orderid = productandorders.orderid Where order.userid = "' +  req.body.userid + '" And productandorders.deliverystatus <> "Delivered" And productandorders.deliverystatus <> "Cancelled"';

    }else{
      getcast = 'SELECT * FROM amazondb.order INNER JOIN amazondb.productandorders ON order.orderid = productandorders.orderid Where order.userid = "' +  req.body.userid + '" And productandorders.deliverystatus ="Cancelled"';

    }
    
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

            orderObj.forEach((eachOrder, index)=> {
              console.log('1',eachOrder);
              //if(productMap.has(eachOrder.productid)){
                console.log('typeof',eachOrder);

                eachOrder['productDetails'] = productMap.get(eachOrder.productid);
                //eachOrder['productDetails.deliverystatus'] = productMap.get(eachOrder.deliverystatus);
                //console.log('2',eachOrder);
             // }
            });


            console.log('orderObj',orderObj);
            
            for(var eachOrder of orderObj){
              if(orderDetailsMap && orderDetailsMap.has(eachOrder.orderid)){
                //let list = orderDetailsMap.get(orderObj.orderid).produ;
                eachOrder.productDetails.deliverystatus = eachOrder.deliverystatus;
                eachOrder.productDetails.id = eachOrder.id;

                orderDetailsMap.get(eachOrder.orderid).productDetailList.push(eachOrder.productDetails);
              }else{ 
                  var productList = [];
                  eachOrder.productDetails.deliverystatus = eachOrder.deliverystatus;
                  eachOrder.productDetails.id = eachOrder.id;

                  productList.push(eachOrder.productDetails);
                  
                  let eachOrderDetailObj = eachOrder;
                  eachOrderDetailObj.productDetailList = productList;
                  eachOrderDetailObj.cardnumber = eachOrderDetailObj.cardnumber.substring(eachOrderDetailObj.cardnumber.length - 4);
 
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
  },

  cancelOrders: (req, res) => {

    var getcast;
    
    getcast = 'UPDATE amazondb.productandorders SET deliverystatus ="Cancelled" WHERE id="'+req.body.id + '"';

    sqlpool.query(getcast, (error, result) => {
      console.log("in cancel orders")
      if (error) {
        console.log(error);
        res.end("Success");
        //callBack(error);
      } else {
        console.log(result);
        res.end("Success");
        
      }

    });
  },
  
  getTrackingDetails: (req, res) => {

    var getcast;
    
    getcast = 'SELECT * FROM amazondb.trackingtable WHERE productorderid = "'+req.body.id + '"';

    sqlpool.query(getcast, (error, result) => {
      console.log("in cancel orders")
      if (error) {
        console.log(error);
        res.send("Error");
        //callBack(error);
      } else {
        console.log(result);
        res.send(result);

      }

    });
  }
}
