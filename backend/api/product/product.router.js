const router = require("express").Router();
const passport = require('passport');



// const { checkToken } = require("../../auth/token_validation");
const {
  searchProduct,
  getProductDetails
} = require("./product.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
// router.get("/", checkToken, getUsers);
router.get("/searchProduct", searchProduct);
router.get("/getProductDetails", getProductDetails)

module.exports = router;