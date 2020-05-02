const router = require("express").Router();
const passport = require('passport');

console.log('test api');
const {
    orders,
} = require("./orders.service");

let checkAuth = passport.authenticate('jwt', { session: false });


router.post("/getOrders", orders);

module.exports = router;