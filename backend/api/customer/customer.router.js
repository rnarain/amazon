const router = require("express").Router();
const passport = require('passport');

const {
    getProductDetails,
} = require("./customer.controller");

let checkAuth = passport.authenticate('jwt', { session: false });


router.get("/getProductDetails", getProductDetails);

module.exports = router;