const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 100,
  port: '3306',
  host: 'amazondb.csgqmwyavxvz.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'amazondatabase',
  database: 'amazondb',
  debug: false,
  multipleStatements: true,
});


module.exports = pool;
