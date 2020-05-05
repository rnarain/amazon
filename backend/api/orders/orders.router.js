const router = require("express").Router();
const passport = require('passport');

console.log('test api');
const {
    orders,
    cancelOrders,
    getTrackingDetails
} = require("./orders.service");

let checkAuth = passport.authenticate('jwt', { session: false });


router.post("/getOrders", orders);
router.post("/cancelOrders", cancelOrders);
router.post("/getTrackingDetails", getTrackingDetails);


module.exports = router;