const router = require("express").Router();
const passport = require('passport');
const multer = require('multer');


// const { checkToken } = require("../../auth/token_validation");
const {
  searchProduct,
  searchProductWithKafka,
  getProductDetails, addProduct, uploadMultiple,
  addReview, insertProducts, searchProductWithRedis ,getProductsByCategoryName
} = require("./product.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
// router.get("/", checkToken, getUsers);
router.get("/searchProduct", searchProduct);
router.get("/searchProductWithRedis", searchProductWithRedis);
router.get("/searchProductWithKafka", searchProductWithKafka);
router.get("/getProductDetails", getProductDetails);
router.get("/getProductsByCategoryName/:name", getProductsByCategoryName);

router.post("/addReview", addReview);
router.post("/insertProducts", insertProducts);

router.post("/addProduct", addProduct);
router.post("/uploadMultiple",multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).array('images'), uploadMultiple)

module.exports = router;