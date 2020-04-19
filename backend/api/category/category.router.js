const router = require("express").Router();
const passport = require('passport');

const {
  getAllCategories,
  addCategory,
} = require("./category.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
 router.get("/getAllCategories", getAllCategories);
 router.post("/addCategory", checkAuth ,addCategory);

 module.exports = router;