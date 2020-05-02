const router = require("express").Router();
const passport = require('passport');

const {
getsellerproducts,
} = require("./sellerinventory.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
 router.get("/getsellerproducts/", getsellerproducts);
 
 
 module.exports = router;