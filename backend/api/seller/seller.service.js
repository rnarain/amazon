const User = require("../../Models/UserModel");
const Product = require("../../Models/ProductModel");
const client = require("../../config/redisconfig");
var sqlpool = require('../../config/sqlconfig');
var kafka = require('../../kafka/client');


module.exports = {
    getSellerDetails: (data, callBack) => {

        const params = {
            data: data,
            path: 'get-seller-details'
        }

        kafka.make_request('seller', params, (error, result) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, result);
        });

        // User.findOne({ name: data.name }, (error, result) => {
        //     if (error) {
        //         callBack(error);
        //     }
        //     return callBack(null, result);
        // })
    },

    getAllSellers: (callBack) => {

        const params = {
            path: 'get-all-sellers'
        }

        kafka.make_request('seller', params, (error, result) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, result);
        });


        // User.find({ userType: 'Seller' }, (error, result) => {
        //     if (error) {
        //         callBack(error);
        //     }
        //     // console.log('result of query in user :', result);
        //     return callBack(null, result);
        // })
    },

    getSellerProducts: (data, callBack) => {

        const params = {
            data: data,
            path: 'get-seller-products'
        }

        kafka.make_request('seller', params, (error, result) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, result);
        });


        // Product.find({ seller_name: data.name }, (error, result) => {
        //     if (error) {
        //         callBack(error);
        //     }
        //     return callBack(null, result);
        // })
    },

    getSellerStatistics : (data, callBack) =>{

      const params = {
        data: data,
        path: 'get-seller-statistics'
      }
      kafka.make_request('seller', params, (error, result) => {
          if (error) {
              callBack(error);
          }
          return callBack(null, result);
      });

      // var results = [];
      // var  detail = {};
      // for(let idx=0; idx<data.products.length; idx++){
      //   var query = 'select sum(productprice * quantity) from productandorders where productid='
      //                 + '\'' + data.products[idx]._id + '\'' +  ' and sellerid= ' + 
      //                 '\'' + data.sellerid + '\';'
      //   detail.total_value = await sqlpool.query(query);

      //   query = 'select sum(quantity) from productandorders where productid='
      //            + '\'' + data.products[idx]._id + '\'' +  ' and sellerid= ' + 
      //            '\'' + data.sellerid + '\';'
      //   detail.total_quantity =  await sqlpool.query(query);
      //   detail.productid = data.products[idx]._id;
      //   results.push(detail);
      // }
      // return callBack(null, results);
    },

    updateProfile: (data, callBack) => {

        const params = {
            data: data,
            path: 'update-seller-profile'
        }

        kafka.make_request('seller', params, (error, result) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, result);
        });



        // User.findOne({ name: data.name, userType: 'Seller' }, (error, result) => {
        //     if (result && result._id != data.id) {
        //         console.log("Name already exists.")
        //         return callBack(null, 'Name Already Exists')
        //     }
        //     else {
        //         User.updateOne({ _id: data.id }, { $set: { name: data.name, address: data.address, profile_pic: data.profile_pic } }, (error, result) => {
        //             if (error) {
        //                 callBack(error);
        //             }
        //             // console.log('result of updateProfile in user :', result);
        //             return callBack(null, result);
        //         })
        //     }
        // })

    },
    getSellerMonthlySales: (id, callBack) => {

        const params = {
            id: id,
            path: 'get-seller-monthly-sales'
        }

        kafka.make_request('seller', params, (error, result) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, result);
        });



        // sqlpool.query(`SELECT MONTH(a.orderdate) as SalesMonth , YEAR(a.orderdate) as SalesYear , SUM(b.quantity * b.productprice) AS TotalSales
        // FROM amazondb.order as a
        // inner join amazondb.productandorders as b on a.orderid= b.orderid
        // Where b.sellerid=?
        // GROUP BY  YEAR(a.orderdate) , MONTH(a.orderdate)
        // ORDER BY YEAR(a.orderdate) DESC , MONTH(a.orderdate) DESC`,
        //     [
        //         id
        //     ], (error, result) => {
        //         if (error) {
        //             console.log(error);
        //             //callBack(error);
        //         } else {
        //             return callBack(null, result);
        //         }
        //     })
    },

}
