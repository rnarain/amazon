const router = require("express").Router();
const passport = require('passport');



// const { checkToken } = require("../../auth/token_validation");
const {
  searchProduct,
  searchProductWithKafka,
  getProductDetails,
  addReview, insertProducts
} = require("./product.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
// router.get("/", checkToken, getUsers);
router.get("/searchProduct", searchProduct);
router.get("/searchProductWithKafka", searchProductWithKafka);
router.get("/getProductDetails", getProductDetails);
router.post("/addReview", addReview);
router.post("/insertProducts", insertProducts);

module.exports = router;