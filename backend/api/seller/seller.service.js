const User = require("../../Models/UserModel");
const Product = require("../../Models/ProductModel");
const client = require("../../config/redisconfig");
var sqlpool = require('../../config/sqlconfig');


module.exports = {
    getSellerDetails: (data, callBack) => {
        User.findOne({ name: data.name }, (error, result) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, result);
        })
    },

    getAllSellers: (callBack) => {
        User.find({ userType: 'Seller' }, (error, result) => {
            if (error) {
                callBack(error);
            }
            console.log('result of query in user :', result);
            return callBack(null, result);
        })
    },

    getSellerProducts: (data, callBack) => {
        Product.find({ seller_name: data.name }, (error, result) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, result);
        })
    },

    updateProfile: (data, callBack) => {

        User.findOne({ name: data.name, userType: 'Seller' }, (error, result) => {
            if (result && result._id != data.id) {
                console.log("Name already exists.")
                return callBack(null, 'Name Already Exists')
            }
            else {
                User.updateOne({ _id: data.id }, { $set: { name: data.name, address: data.address, profile_pic: data.profile_pic } }, (error, result) => {
                    if (error) {
                        callBack(error);
                    }
                    // console.log('result of updateProfile in user :', result);
                    return callBack(null, result);
                })
            }
        })

    },
    getSellerMonthlySales: (id, callBack) => {
        sqlpool.query(`SELECT MONTH(a.orderdate) as SalesMonth , YEAR(a.orderdate) as SalesYear , SUM(b.quantity * b.productprice) AS TotalSales
        FROM amazondb.order as a
        inner join amazondb.productandorders as b on a.orderid= b.orderid
        Where b.sellerid=?
        GROUP BY  YEAR(a.orderdate) , MONTH(a.orderdate)
        ORDER BY YEAR(a.orderdate) DESC , MONTH(a.orderdate) DESC`,
        [
           id
        ], (error, result) => {
            if (error) {
              console.log(error);
              //callBack(error);
            } else {
              return callBack(null, result);
            }
          })
    },

}
