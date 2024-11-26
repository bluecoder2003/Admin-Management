const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all users with their roles
router.get("/", async (req, res) => {
  const query = `
    SELECT 
        users.id AS user_id,
        users.name AS user_name,
        users.email,
        roles.name AS role_name,
        users.status
    FROM 
        users
    JOIN 
        roles
    ON 
        users.role_id = roles.id
  `;

  try {
    const [rows] = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  const { name, email, role_id, status } = req.body;
  const query = "INSERT INTO users (name, email, role_id, status) VALUES (?, ?, ?, ?)";

  try {
    const [result] = await db.query(query, [name, email, role_id, status]);
    res.status(201).json({ id: result.insertId, name, email, role_id, status });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: "Failed to add user" });
  }
});

module.exports = router;
