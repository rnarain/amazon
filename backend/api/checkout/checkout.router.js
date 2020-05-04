const router = require("express").Router();
const passport = require('passport');

// const { checkToken } = require("../../auth/token_validation");
const {
  placeOrder
} = require("./checkout.controller");

// let checkAuth = passport.authenticate('jwt', { session: false });
router.post("/placeorder", placeOrder);

module.exports = router;