const router = require("express").Router();
const passport = require('passport');

console.log('test api');
const {
    signup,
} = require("./signup.service");

let checkAuth = passport.authenticate('jwt', { session: false });


router.post("/", signup);

module.exports = router;