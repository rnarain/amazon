const router = require("express").Router();
const passport = require('passport');

const {
  getallitemsincart,
  deleteproduct,
  updatequantity,
  addtocart,
  saveforlater,
  updategiftorder,
  checkoutcart,
  updategiftmsg,
  deletecart
} = require("./cart.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
 router.get("/getallitemsincart/:id", getallitemsincart);
 router.post("/deleteproduct",deleteproduct);
 router.post("/updatequantity",updatequantity);
 router.post("/addtocart",addtocart);
 router.post("/saveforlater",saveforlater);
 router.post("/updategiftorder",updategiftorder);
 router.post("/checkoutcart",checkoutcart);
 router.post("/updategiftmsg",updategiftmsg);
 router.post("/deletecart",deletecart);


 
 

 

 
 
 module.exports = router;