const User = require("../../Models/UserModel");

module.exports = {
  // createAddress : (data, callBack) => {
  //   console.log("reached here ",data);
  //   var newAddress = new Address({
  //     userid : data.id,
  //     address : [{
  //       name : data.name,
  //       streetaddressline_1 : data.streetaddressline_1,
  //       streetaddressline_2 : data.streetaddressline_2,
  //       country : data.country,
  //       state : data.state,
  //       city : data.city,
  //       zipcode : data.zipcode,
  //       phone : data.phone
  //     }]
  //   });
  //   Address.findOne({ userid : data.id }, (error, user) => {
  //     if (error) {
  //       callBack(error);
  //     }
  //     if (!user) {
  //       newAddress.save((error, data) => {
  //         if (error) {
  //           callBack(error);
  //         }
  //         console.log(data);
  //         return callBack(null, data);
  //       })
  //     } 
  //   })
  // },

  addAddress : (data, callBack) => {
    let newData = {
      name : data.name,
      streetaddressline_1 : data.streetaddressline_1,
      streetaddressline_2 : data.streetaddressline_2,
      country : data.country,
      state : data.state,
      city : data.city,
      zipcode : data.zipcode,
      phone : data.phone
    }
    User.findOneAndUpdate({ _id : data.id }, { $addToSet : { addresses : newData }  },{new:true}, (error, results) => {
      if (error) {
        callBack(error);
      }//console.log("Address",results);
      if(!results){
        return callBack(null,{address : null});
      }
      var idx=results.addresses.length;
      var insertedAddress = results.addresses[idx-1];
      // console.log("Address",results.addresses[idx-1]);
      return callBack(null,{address : insertedAddress});
    });
  },

  updateAddress :(data,callBack)=>{
    console.log("reached ", data);
    User.updateOne({ _id : data.id , 'addresses._id' : data.addressid}, 
    { "$set": 
      {
        'addresses.$.name': data.name,
        'addresses.$.streetaddressline_1': data.streetaddressline_1,
        'addresses.$.streetaddressline_2': data.streetaddressline_2,
        'addresses.$.country': data.country,
        'addresses.$.state': data.state,
        'addresses.$.city': data.city,
        'addresses.$.zipcode': data.zipcode,
        'addresses.$.phone': data.phone
      }  
    },  (error, results) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
    );
  },
  
  deleteAddress : (data, callBack) => {
    console.log("delete address ", data);
    User.updateOne({ _id: data.id },
      { "$pull": { 'addresses': { _id : data.addressid } } },
      (error, result) => {
   
      if (error) {
        callBack(error);
      }
      // console.log("Here",result);
      return callBack(null, result);
  });
},

getAddressDetails: (addressid , callBack) => {
  User.findOne({'addresses._id' : addressid} , (error, result) => {
    if (error) {
      callBack(error);
    }

    if (!result || result.addresses.length <=0) {
      callBack(null, "Address Not found");
    }
    const addresses = result.addresses;

    addresses.forEach(element => {
      if (element._id == addressid) {
        return callBack(null, element);
      }
    });
  });
},


getAllAddress : (id,callBack) => {
    User.findById({_id : id},
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results.addresses);
      }
    );
  },
}















































