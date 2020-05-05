const router = require("express").Router();
const passport = require('passport');

const {
  getAllCategories,
  addCategory,
  deleteCategory
} = require("./category.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
 router.get("/getAllCategories", getAllCategories);
 router.post("/addCategory" ,addCategory);
 router.post("/deleteCategory" ,deleteCategory);


 module.exports = router;