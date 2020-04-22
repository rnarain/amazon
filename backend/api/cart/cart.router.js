const router = require("express").Router();
const passport = require('passport');

const {
  getallitems,
} = require("./cart.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
 router.get("/getallitems", getallitems);

 module.exports = router;