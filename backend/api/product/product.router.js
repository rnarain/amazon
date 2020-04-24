const router = require("express").Router();
const passport = require('passport');



// const { checkToken } = require("../../auth/token_validation");
const {
  searchProduct,
  getProductDetails,
  addReview
} = require("./product.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
// router.get("/", checkToken, getUsers);
router.get("/searchProduct", searchProduct);
router.get("/getProductDetails", getProductDetails);
router.post("/addReview", addReview);

module.exports = router;