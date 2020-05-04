const {
  searchProduct, getProductDetails,
  addReview, insertProducts,
  searchProductWithKafka, searchProductWithRedis , getProductsByCategoryName
} = require("./product.service");

const jwt = require('jsonwebtoken');
const { secret } = require('../../config/configValues');
var kafka = require('../../kafka/client');
const url = require('url');
var multer = require('multer')


var storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../Frontend/public/Uploads/Profile-Pic')
  },
  filename(req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype)
    if (file.mimetype == "image/png" || "image/jpg" || "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      console.log(file.mimetype);
      return cb({
        success: 0,
        data: "Only images allowed"
      });
    }
  }
}).single('file');


module.exports = {
  searchProduct: (req, res) => {
    var queryObject = url.parse(req.url, true).query;
    console.log(queryObject);
    searchProduct(queryObject, (err, results) => {
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

  searchProductWithRedis: (req, res) => {
    var queryObject = url.parse(req.url, true).query;
    console.log(queryObject);
    searchProductWithRedis(queryObject, (err, results) => {
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

  searchProductWithKafka: (req, res) => {
    var queryObject = url.parse(req.url, true).query;
    searchProductWithKafka(queryObject, (err, results) => {
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
  getProductDetails: (req, res) => {
    body = req.query
    getProductDetails(body, (err, results) => {
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

  getProductsByCategoryName: (req, res) => {
    const name = req.params.name;
    getProductsByCategoryName(name, (err, results) => {
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

  getProductsByCategoryName: (req, res) => {
    const name = req.params.name;
    getProductsByCategoryName(name, (err, results) => {
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

  addReview: (req, res) => {
    body = req.body;
    console.log('In controller ', body)
    addReview(body, (err, results) => {
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

  insertProducts: (req, res) => {
    body = req.body;
    console.log('In controller insert Products ', body)
    insertProducts(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  }
}