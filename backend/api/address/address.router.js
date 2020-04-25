const router = require("express").Router();
const passport = require('passport');



// const { checkToken } = require("../../auth/token_validation");
const {
  getAllAddress,
  addAddress,
  updateAddress,
  deleteAddress,
  getAddressDetails
} = require("./address.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
// router.get("/", checkToken, getUsers);
 router.get("/getAddressDetails/:addressid", getAddressDetails);
 router.get("/getAllAddress/:id", getAllAddress);

 router.post("/updateAddress", updateAddress);
 router.post("/addAddress" ,addAddress);
 router.post("/deleteAddress",deleteAddress);
 
// router.patch("/", checkToken, updateCard);
// router.delete("/", checkToken, deleteCard);

module.exports = router;