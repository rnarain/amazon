const Category = require("../../Models/CategoryModel");

module.exports = {

  getAllCategories: (callBack) => {
    Category.find({},{category:1, _id:0}, (error, result) => {
      if (error) {
        callBack(error);
      }
      console.log(result);
      return callBack(null, result);
    });
  },

  addCateogry: (data, callBack) => {
    var newCategory = new Cateogry({
      category: data.name
    })
    Cateogry.save((error, results) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
    );
  },
}
