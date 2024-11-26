const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: true,
    ca: process.env.DB_SSL_CA ? require("fs").readFileSync(process.env.DB_SSL_CA).toString() : null,
    minVersion: 'TLSv1.2'
  } : false
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected!");
    connection.release();
  }
});

module.exports = pool.promise();
