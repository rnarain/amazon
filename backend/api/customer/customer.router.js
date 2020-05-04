const router = require("express").Router();
const passport = require('passport');
const multer = require('multer');


// const { checkToken } = require("../../auth/token_validation");
const {
  getCustomerDetails,
  updateProfile, upload

} = require("./customer.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
// router.get("/", checkToken, getUsers);
router.get("/getCustomerDetails", getCustomerDetails);
router.post("/updateProfile", updateProfile);
router.post("/upload", multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single('image'), upload);


module.exports = router;