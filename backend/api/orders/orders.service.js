const User = require("../../Models/UserModel");
//Imported for jwt 
const jwt = require('jsonwebtoken');
const { secret } = require("../../config/configValues");
const { auth } = require("../../config/passport");
const { checkAuth } = require("../../config/passport");


var sqlpool = require('../../config/sqlconfig');


module.exports = {
  
  orders: (req, res) => {
    const getcast = 'SELECT * FROM amazondb.productandorders where orderid In (select orderid from amazondb.order where userid = "' + req.body.userid + '")';
    sqlpool.query(getcast, (error, result) => {
      console.log("in orders")
      if (error) {
        console.log(error);
        //callBack(error);
      } else {
        if (result && result != null) {
          console.log(result);
          //res.body = user;
          return res.send(result);
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
