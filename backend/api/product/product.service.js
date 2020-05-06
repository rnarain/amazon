const Product = require("../../Models/ProductModel");
const User = require("../../Models/UserModel");
const client = require("../../config/redisconfig");
var kafka = require('../../kafka/client');

const {upload} = require('../customer/customer.service')

module.exports = {

  searchProduct: (data, callBack) => {
    let filter = {};
    if (data.category == 'All') filter = {
      name: { "$regex": data.name, "$options": "i" }
    }
    else {
      filter = {
        name: { "$regex": data.name, "$options": "i" },
        category: { "$regex": data.category, "$options": "i" }
      }
    }
    Product.find(filter, (error, result) => {
      if (error) {
        callBack(error);
      }
      // console.log(result);
      return callBack(null, result);
    });
  },


  searchProductWithRedis: (data, callBack) => {

    const productSearchRedisKey = 'product_search:details';
    let filter = {};
    if (data.category == 'All') filter = {
      name: { "$regex": data.name, "$options": "i" }
    }
    else {
      filter = {
        name: { "$regex": data.name, "$options": "i" },
        category: { "$regex": data.category, "$options": "i" }
      }
    }

    return client.get(productSearchRedisKey, (err, details) => {
      if (details) {
        console.log('GETTING KEY VALUE ')
        return callBack(null, JSON.parse(details));
      }
      else {


        Product.find(filter, (error, details) => {
          if (error) {
            callBack(error);
          }
          // console.log(details);
          console.log('SETTING KEY VALUE ')
          client.setex(productSearchRedisKey, 3600, JSON.stringify(details))
          return callBack(null, details);
        });

      }
    })
  },


  searchProductWithKafka: (data, callBack) => {
    let filter = {};
    if (data.category == 'All') filter = {
      name: { "$regex": data.name, "$options": "i" }
    }
    else {
      filter = {
        name: { "$regex": data.name, "$options": "i" },
        category: { "$regex": data.category, "$options": "i" }
      }
    }
    const params = {
      data: filter,
      path: 'search-product'
    }
    kafka.make_request('product', params, (error, result) => {
      if (error) {
        callBack(error);
      }
      console.log(result);
      return callBack(null, result);
    });

  },

  getProductDetails: (data, callBack) => {
    // const productDetailsRedisKey = 'product_id:details';

    // return client.get(productDetailsRedisKey, (err, details) => {
    //   if (details) {
    //     console.log('GETTING KEY VALUE ')

    //     return callBack(null, JSON.parse(details));
    //   }
    //   else {
    //     Product.findOne({ _id: data._id }, (error, details) => {
    //       if (error) {
    //         callBack(error);
    //       }
    //       client.setex(productDetailsRedisKey, 3600, JSON.stringify(details))
    //       console.log('SET KEY VALUE')
    //       return callBack(null, details);

    //     });

    //   }
    // })


    Product.findOne({ _id: data._id }, (error, result) => {
      if (error) {
        console.log('error')
        callBack(error);
      }
      return callBack(null, result);
    });

  },
  getProductsByCategoryName: (name, callBack) => {
    Product.find({ category: name }, (error, result) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, result);
    });
  },

  addReview: (data, callBack) => {
    console.log('In service ', data);
    Product.findOneAndUpdate({ _id: data.id }, { $set: { ratings: data.ratings } }, { new: true }, (error, result) => {
      if (error) {
        callBack(error);
      }
    })

    userRating = {
      product_id: data.id,
      product_name: data.name,
      stars: data.ratings[data.ratings.length - 1].stars,
      comment: data.ratings[data.ratings.length - 1].comment
    }

    console.log(userRating)



    User.findOneAndUpdate({ _id: data.ratings[data.ratings.length - 1].user_id }, { $push: { ratings: userRating } }, { upsert: true }, (error, result) => {
      if (error) {
        callBack(error);
      }
      // console.log(result);
      return callBack(null, result);
    })

  },

  insertProducts: (data, callBack) => {
    console.log('IN insertProducts Service');
    for (let i = 0; i < data.num_of_products; i++) {
      Product.create({ name: "kapil" + i, price: 232, category: 'All', seller_id: '5ea4c57c89f77fce1106f251', seller_name: 'Great Value' }, (error, result) => {
        if (error)
          callBack(error);

      });
    }
    return callBack(null, '');
  },

  addProduct: (data, callBack) => {
    console.log("In add products service");
    // User.find({ seller_id : data.seller_id, userType: 'Seller'}, (error, results) => {
    //   if(error)
    //     callBack(error);
    //   if(results.length == 0)
    //     return callBack(null, 'No Seller with this ID')
    // })
    Product.create({ name: data.name, description: data.description, price: data.price, category: data.category, seller_id: data.seller_id, seller_name: data.seller_name, images: data.images }, (error, results) => {
      if (error)
        callBack(error);
      // if(data.images.length > 0){
      //   upload(data.images[0]);
      // }
      return callBack(null, results);
    });

  }



}
