const {
  createCard,
  getCardDetails,
  addCard,
  deleteCard,
  updateCard,
  getAllCards,
} = require("./card.service");

const jwt = require('jsonwebtoken');
const { secret } = require('../../config/configValues');
var kafka = require('../../kafka/client');

module.exports = {
  createCard: (req, res) => {
    const body = req.body;
    createCard(body, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "Card saved successfully"
      });
    });
  },

  getCardDetails: (req, res) => {
    const id = req.params.id;
    getCardDetails(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },

  addCard : (req, res) => {
    const body = req.body;
    addCard(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  updateCard : (req, res) => {
    const body = req.body;
    updateCard(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  deleteCard: (req, res) => {
    const body = req.body;
    deleteCard(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },


  getAllCards: (req, res) => {
    console.log("GetAllCards ", req);
    const id = req.params.id;
    getAllCards(id,(err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
}