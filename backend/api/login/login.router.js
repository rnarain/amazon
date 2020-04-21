const router = require("express").Router();
const passport = require('passport');

console.log('test api');
const {
    login,
} = require("./login.service");

let checkAuth = passport.authenticate('jwt', { session: false });


router.post("/", login);

module.exports = router;