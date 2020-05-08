const User = require("../../Models/UserModel");
const Product = require("../../Models/ProductModel");
var sqlpool = require('../../config/sqlconfig');
var ds = require('../../config/dynamicSort')
let dynamicSort = ds.dynamicSort

module.exports = {
  getUserDetails: (id,callBack)=> {
    User.findById((id), (error, result) => {
      if (error) {
        console.log(error);
        callBack(error);
      } else {
          return callBack(null, result);
      }
    });
  },
   getAdminAnalytics: async (callBack)=> {

    let analytics = {
      ordersPerDay : 0,
      top5SoldProducts : [],
      top5Sellers : [],
      top5Customer : [],
      top10ProductsOnRating: [],
      top10ProductsViewed : []
    }
   
    let productMap = new Map();
    let productList = [];
    await Product.find({}, {name: 1 , category : 1 , ratings : 1 ,view_count :1 } , (err , result) =>{
      productMap = new Map(result.map(i => [i._id.toString(), i]));
      result.forEach(product => {
        product.avg = 0
          product.avg = Math.ceil((product.ratings.reduce((r, c) => r + c.stars, 0) / product.ratings.length));
        })
        analytics.top10ProductsOnRating = result.sort(dynamicSort('avg' , -1)).slice(0,10);
        analytics.top10ProductsViewed = result.sort(dynamicSort('view_count' , -1)).slice(0,10);
      })

    let userMap = new Map();
    await User.find({}, {name: 1} , (err , result) =>{
      userMap = new Map(result.map(i => [i._id.toString(), i]));
    })

    
    await sqlpool.query(`SELECT COUNT(*) as count FROM amazondb.order WHERE DATEDIFF(CURRENT_TIMESTAMP,orderdate) < 1`, (error, result) => {
      if (error) {
        console.log(error);
        //callBack(error);
      } else {
        console.log(result[0].count);
        analytics.ordersPerDay += result[0].count;
      }
    })
    await sqlpool.query(`SELECT productid , COUNT(productid) AS count FROM amazondb.productandorders
    WHERE deliverystatus = "Delivered"
    GROUP BY productid
    ORDER BY COUNT(productid) DESC
    LIMIT 5`, (error, result) => {
      if (error) {
        console.log(error);
        //callBack(error);
      } else {
        result.forEach(product => {
          let matchingProduct = productMap.get(product.productid);
          if(matchingProduct){
            product.name = matchingProduct.name;
            product.category = matchingProduct.category;
          }
        });
        analytics.top5SoldProducts = result;
      }
    })
    await sqlpool.query(`SELECT sellerid , SUM(quantity * productprice ) AS sales FROM amazondb.productandorders
    WHERE deliverystatus = "Delivered"
    GROUP BY sellerid
    ORDER BY  SUM(quantity * productprice ) DESC
    LIMIT 5`, (error, result) => {
      if (error) {
        console.log(error);
        //callBack(error);
      } else {
        result.forEach(seller => {
          let matchingSeller = userMap.get(seller.sellerid);
          if(matchingSeller){
            seller.name = matchingSeller.name;
          }
        });
        analytics.top5Sellers = result;
      }
    })
    await sqlpool.query(`SELECT userid , SUM(b.quantity * b.productprice) AS sales FROM amazondb.order as a
    JOIN amazondb.productandorders as b  ON a.orderid = b.orderid
    WHERE b.deliverystatus = "Delivered"
    GROUP BY a.userid
    ORDER BY  SUM(b.quantity * b.productprice) DESC
    LIMIT 5`, (error, result) => {
      if (error) {
        console.log(error);
        //callBack(error);
      } else {
        result.forEach(customer => {
          let matchingCompany = userMap.get(customer.userid);
          if(matchingCompany){
            customer.name = matchingCompany.name;
          }
        });
        analytics.top5Customer = result;
        return callBack(null, analytics);
      }
    })
  }
}
