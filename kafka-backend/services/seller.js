const Product = require('../Models/ProductModel');
const User = require('../Models/UserModel');
var sqlpool = require('../config/sqlconfig');

function handle_request(msg, callBack) {

    if (msg.path == 'get-seller-details') {
        
        const data = msg.data;
        User.findOne({ name: data.name }, (error, result) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, result);
        })
    }

    if (msg.path == 'get-all-sellers') {

        User.find({ userType: 'Seller' }, (error, result) => {
            if (error) {
                callBack(error);
            }
            // console.log('result of query in user :', result);
            return callBack(null, result);
        })
    }

    if (msg.path == 'get-seller-products') {

        const data = msg.data;
        Product.find({ seller_name: data.name }, (error, result) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, result);
        })
    }

    if (msg.path == 'get-seller-statistics') {
        var total_result = [];
        const data = msg.data;
        var size = 0;
        for(let idx=0; idx< data.products.length; idx++){
          const value_query = 'select sum(productprice * quantity) from productandorders where productid='
                        + '\'' + data.products[idx]._id + '\'' +  ' and sellerid= ' + 
                        '\'' + data.sellerid + '\' and deliverystatus=\'Delivered\';'

          const quant_query = 'select sum(quantity) from productandorders where productid='
                        + '\'' + data.products[idx]._id + '\'' +  ' and sellerid= ' + 
                        '\'' + data.sellerid + '\' and deliverystatus=\'Delivered\';'
          sqlpool.query(value_query, (error, result) => {
            if (error) {
              callBack(error);
              console.error(error);
            }
            var detail = {};
            var obj = JSON.parse(JSON.stringify(result[0]));
            detail.total_value = obj[Object.keys(obj)[0]] ?  obj[Object.keys(obj)[0]] : 0;

            detail.category = data.products[idx].category;
            detail.productid = data.products[idx]._id;
            detail.productname = data.products[idx].name;

            sqlpool.query(quant_query, (error,result)=>{
              if (error) {
                callBack(error);
                console.error(error);
              }
              obj = JSON.parse(JSON.stringify(result[0]));
              detail.total_quantity= obj[Object.keys(obj)[0]] ? obj[Object.keys(obj)[0]] : 0;
              size = size + 1;
              if (detail.total_value !==0) {
                total_result.push(detail);
              }
              console.log(detail);
              if (size === data.products.length){
                return callBack(null, total_result);
              }
            });
          });
        }
    }

    if (msg.path == 'update-seller-profile') {

        const data = msg.data;
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
    }

    if (msg.path == 'get-seller-monthly-sales') {

        const id = msg.id;
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
    }


}

exports.handle_request = handle_request;