const router = require("express").Router();
const passport = require('passport');



// const { checkToken } = require("../../auth/token_validation");
const {
  createCard,
  getCardDetails,
  getAllCards,
  addCard,
  updateCard,
  deleteCard
} = require("./card.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
// router.get("/", checkToken, getUsers);
 router.post("/createCard", createCard);
 router.get("/getCardDetails/:id", getCardDetails);
 router.get("/getAllCards/:id", getAllCards);

 router.post("/updateCard", updateCard);
 router.post("/addCard" ,addCard);
 router.post("/deleteCard",deleteCard);
 
// router.patch("/", checkToken, updateCard);
// router.delete("/", checkToken, deleteCard);

module.exports = router;