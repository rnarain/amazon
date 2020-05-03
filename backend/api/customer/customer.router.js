const router = require("express").Router();
const passport = require('passport');



// const { checkToken } = require("../../auth/token_validation");
const {
  getCustomerDetails,
  updateProfile

} = require("./customer.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
// router.get("/", checkToken, getUsers);
router.get("/getCustomerDetails", getCustomerDetails);
router.post("/updateProfile", updateProfile);


module.exports = router;