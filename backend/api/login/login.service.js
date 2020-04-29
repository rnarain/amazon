const User = require("../../Models/UserModel");

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
    User.find({email: req.body.email,password : req.body.password}, (error, result) => {
      console.log("in login")
      if (error) {
        console.log(error);
        //callBack(error);
      }
      console.log(result);
      //res.body = user;
      return res.send(result);
    });
  }
}
