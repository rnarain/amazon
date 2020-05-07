const router = require("express").Router();
const passport = require('passport');

const {
getsellerproducts,
removeproduct,
searchproductinventory,
updatesellerproduct
} = require("./sellerinventory.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
 router.get("/getsellerproducts/:id", getsellerproducts);
 router.post("/removeproduct/",removeproduct);
 router.get("/searchproductinventory/",searchproductinventory);
 router.put("/updatesellerproduct/",updatesellerproduct);
 module.exports = router;