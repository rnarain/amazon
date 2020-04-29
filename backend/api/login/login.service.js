const User = require("../../Models/UserModel");
//Imported for jwt 
const jwt = require('jsonwebtoken');
const { secret } = require("../../config/configValues");
const { auth } = require("../../config/passport");
const { checkAuth } = require("../../config/passport");

module.exports = {
  /*login: (data, callBack) => {
      console.log('data',data);
    User.find({email: data.email,password:data.password}, (error, result) => {
      if (error) {
        console.log(error);
        callBack(error);
      }
      console.log(result);
    return callBack(null, result);
    });
  }*/
  login: (req, res) => {
    auth();
    User.findOne({ email: req.body.email, password: req.body.password }, (error, result) => {
      console.log("in login")
      if (error) {
        console.log(error);
        //callBack(error);
      } else {
        if (result && result != null) {
          res.cookie("cookie", "admin", {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          res.cookie("userId", req.body._id, {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          res.cookie("userType", req.body.userType, {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });

          const payload = { _id: result._id };
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000
          });
          result.token = token;
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
