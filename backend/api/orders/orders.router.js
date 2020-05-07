const router = require("express").Router();
const passport = require('passport');

console.log('test api');
const {
    orders,
    cancelOrders,
    getTrackingDetails,
    changeOrderStatus
} = require("./orders.service");

let checkAuth = passport.authenticate('jwt', { session: false });


router.post("/getOrders", orders);
router.post("/cancelOrders", cancelOrders);
router.post("/getTrackingDetails", getTrackingDetails);
router.post("/changeOrderStatus", changeOrderStatus);



module.exports = router;