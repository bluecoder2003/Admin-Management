// require('dotenv').config(); // Load environment variables
// const express = require('express');
// const mysql = require('mysql2');
// const fs = require('fs');

// // Create the Express app
// const app = express();
// app.use(express.json());

// // MySQL connection using environment variables
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   ssl: {
//     ca: fs.readFileSync(process.env.DB_SSL_CA).toString(), // Load CA certificate
//   },
// });

// // Connect to the database
// // connection.connect((err) => {
// //   if (err) {
// //     console.error('Error connecting to the database:', err.message);
// //   } else {
// //     console.log('Connected to the MySQL database.');
// //   }
// // });

// // Routes

// // Get all roles
// app.get('/roles', (req, res) => {
//   connection.query('SELECT * FROM roles', (err, results) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error retrieving roles');
//     } else {
//       res.json(results);
//     }
//   });
// });

// // Get all users with their roles
// app.get('/users', (req, res) => {
//   const query = `
//     SELECT 
//         users.id AS user_id,
//         users.name AS user_name,
//         users.email,
//         roles.name AS role_name,
//         users.status
//     FROM 
//         users
//     JOIN 
//         roles
//     ON 
//         users.role_id = roles.id
//   `;

//   connection.query(query, (err, results) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error retrieving users');
//     } else {
//       res.json(results);
//     }
//   });
// });

// // Create a new user
// app.post('/users', (req, res) => {
//   const { name, email, role_id, status } = req.body;
//   const query = 'INSERT INTO users (name, email, role_id, status) VALUES (?, ?, ?, ?)';
//   connection.query(query, [name, email, role_id, status], (err, results) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error adding user');
//     } else {
//       res.status(201).send('User added successfully');
//     }
//   });
// });

// // Create a new role
// app.post('/roles', (req, res) => {
//   const { name, permissions, description } = req.body;
//   const query = 'INSERT INTO roles (name, permissions, description) VALUES (?, ?, ?)';
//   connection.query(query, [name, JSON.stringify(permissions), description], (err, results) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error adding role');
//     } else {
//       res.status(201).send('Role added successfully');
//     }
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
