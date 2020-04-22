var sqlpool = require('../../config/sqlconfig');
module.exports = {

  getallitems: (callBack) => {
        console.log('Inside  getusers ');
      
        const getcast = 'SELECT * FROM amazondb.order';
        sqlpool.query(getcast, (err, result) => {
          if (err) {
            callBack(error);
          } else (result.length > 0) 
          {
            console.log(result);
            return callBack(null, result);
          } 
        });
}
  
}
