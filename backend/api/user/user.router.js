const router = require("express").Router();
const passport = require('passport');

console.log('test api');
const {
    getUserDetails,
    getAdminAnalytics
} = require("./user.controller");

let checkAuth = passport.authenticate('jwt', { session: false });


router.get("/getUserDetails/:id", getUserDetails);
router.get("/getAdminAnalytics", getAdminAnalytics);


module.exports = router;