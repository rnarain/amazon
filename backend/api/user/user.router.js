const router = require("express").Router();
const passport = require('passport');

console.log('test api');
const {
    getUserDetails,
} = require("./user.controller");

let checkAuth = passport.authenticate('jwt', { session: false });


router.get("/getUserDetails/:id", getUserDetails);

module.exports = router;