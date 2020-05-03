const User = require("../../Models/UserModel");
const Category = require("../../Models/CategoryModel");

//Imported for jwt 
const jwt = require('jsonwebtoken');
const { secret } = require("../../config/configValues");
const { auth } = require("../../config/passport");
const { checkAuth } = require("../../config/passport");

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
  }
}
