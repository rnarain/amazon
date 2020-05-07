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
      console.log('inside all');
    }else if(req.body.type == "Open"){
      getcast = 'SELECT * FROM amazondb.order INNER JOIN amazondb.productandorders ON order.orderid = productandorders.orderid Where order.userid = "' +  req.body.userid + '" And productandorders.deliverystatus <> "Delivered" And productandorders.deliverystatus <> "Cancelled"';
      console.log('inside open');
    }
    else if(req.body.type == "Seller"){
    getcast = 'SELECT * FROM amazondb.order INNER JOIN amazondb.productandorders ON order.orderid = productandorders.orderid Where  productandorders.sellerid = "' +  req.body.sellerid + '" ORDER BY order.orderdate DESC';
    }
    
    else{
      getcast = 'SELECT * FROM amazondb.order INNER JOIN amazondb.productandorders ON order.orderid = productandorders.orderid Where order.userid = "' +  req.body.userid + '" And productandorders.deliverystatus ="Cancelled"';
      console.log('inside nit open');
    }
  
    //Get orders ddata

    sqlpool.query(getcast, (error, result) => {
      console.log("in orders")
      if (error) {
        console.log(error);
        //callBack(error);
      } else {
        
        if (result && result != null) {
          orderObj = result;
          
          var productList = [];
          for(var eachOrderId of orderObj){
            if(!productList.includes(eachOrderId.productid)){
              productList.push(eachOrderId.productid);
            }
          }
          
          //Get mongo data //Get products
          productModel.find({'_id': { $in: productList }} , (error, productResult) => {
            var orderDetailsMap = new Map();

            //Product id to details map
            var productMap = new Map(productResult.map(i => [i._id.toString(), i]));

            orderObj.forEach((eachOrder, index)=> {
              //if(productMap.has(eachOrder.productid)){

             
                eachOrder['productDetails'] = productMap.get(eachOrder.productid);
                eachOrder['productDetails']['deliverystatus'] = eachOrder.deliverystatus;
                eachOrder['productDetails']['quantity'] = eachOrder.quantity;
                //console.log('2',eachOrder);
             // }
            });

            console.log(orderObj)
            
            for(let eachOrder of orderObj){
              if(orderDetailsMap && orderDetailsMap.has(eachOrder.orderid)){
                //let list = orderDetailsMap.get(orderObj.orderid).produ;
                
                //eachOrder.productDetails.deliverystatus = eachOrder.deliverystatus;
                eachOrder.productDetails.id = eachOrder.id;
                // console.log("kailash console next time=>",eachOrder.productDetails)

                orderDetailsMap.get(eachOrder.orderid).productDetailList.push(eachOrder.productDetails);
              }else{ 
                //console.log('eachOrder',eachOrder);
                  let productList = [];
                 // eachOrder.productDetails.deliverystatus = eachOrder.deliverystatus;
                  eachOrder.productDetails.id = eachOrder.id;
                  // console.log("kailash console first time=>",eachOrder.productDetails );
                  productList.push(eachOrder.productDetails);

                  let eachOrderDetailObj = eachOrder;
                  eachOrderDetailObj.productDetailList = productList;
                  eachOrderDetailObj.cardnumber = eachOrderDetailObj.cardnumber.substring(eachOrderDetailObj.cardnumber.length - 4);
 
                  orderDetailsMap.set(eachOrder.orderid,eachOrderDetailObj);
              }
              
            }
            //console.log('productList',orderDetailsMap);
            // console.log("kailash console=>",orderDetailsMap)
            res.body = orderDetailsMap;
            var arrayList = Array.from( orderDetailsMap.values() );
            // console.log('productList',orderDetailsMap.values());
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
    
    getcast = 'UPDATE amazondb.productandorders SET deliverystatus ="Cancelled" WHERE id="'+req.body.id + '" LIMIT 1';

    sqlpool.query(getcast, (error, result) => {
      console.log("in cancel orders")
      if (error) {
        console.log(error);
        res.end("Success");
        //callBack(error);
      } else {
        console.log(result);


        var dbQuery = "INSERT INTO amazondb.trackingtable (productorderid,deliverystatus,updatedtime) VALUES('"+req.body.id+"','Cancelled','"+new Date().toLocaleString()+"');";

        sqlpool.query(
            dbQuery,
            (err, rows) => {
            if (err) throw err;
        
            console.log('Data received from Db:\n');
            //console.log(rows);
            }
        );


        res.end("Success");
        
      }

    });
  },
  
  getTrackingDetails: (req, res) => {

    var getcast;
    
    getcast = 'SELECT * FROM amazondb.trackingtable WHERE productorderid = "'+req.body.id + '" ORDER By updatedtime DESC';

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
