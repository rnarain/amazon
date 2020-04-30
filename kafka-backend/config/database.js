const { createPool } = require("mysql");

// const pool = createPool({
//   host: "handshake.can6zkiblkwb.us-east-1.rds.amazonaws.com",
//   port: "3306",
//   user: "admin",
//   password: "jordan(1)",
//   database: "handshake",
//   connectionLimit: 1
// });

const pool = createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 1
});

module.exports = pool;
