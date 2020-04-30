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
  signup: (req, res) => {
    console.log('req.body',req.body);

    var query = {};
    query.userType =req.body.userType;

    if(req.body.userType == "Seller"){
      query['$or'] = [];
      var queryFilter = [];
      queryFilter.push({'name':req.body.name});
      queryFilter.push({'email':req.body.email});
      query['$or'] = queryFilter;
    }else{
      query.email =req.body.emailID;
    }

    User.findOne(query, (error, result) => {
      if (error) {
        console.log(error);
        //callBack(error);
      }else if (result && result != null){
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        })
        console.log('invalid');
        res.end("Invalid Credentials");
      }else {
        var newUserDetails = new User({
          name: req.body.name,
          email: req.body.emailID, 
          password: req.body.password,
          userType: req.body.userType
        });
    
        newUserDetails.save((error, data) => {
          if (error) {
            console.log('error', error);
            res.writeHead(500, {
              'Content-Type': 'text/plain'
            })
            res.end();
          }
          else {
            console.log('data', data);
            res.writeHead(200, {
              'Content-Type': 'text/plain'
            })
            res.end();
          }
        });
      }
    });
  }
}
