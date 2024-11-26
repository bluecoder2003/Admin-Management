const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all roles
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM roles");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching roles:", err);
    res.status(500).json({ error: "Failed to fetch roles" });
  }
});

// Create a new role
router.post("/", async (req, res) => {
  const { name, permissions, description } = req.body;
  const query = "INSERT INTO roles (name, permissions, description) VALUES (?, ?, ?)";

  try {
    const [result] = await db.query(query, [name, JSON.stringify(permissions), description]);
    res.status(201).json({ id: result.insertId, name, permissions, description });
  } catch (err) {
    console.error("Error adding role:", err);
    res.status(500).json({ error: "Failed to add role" });
  }
});



module.exports = router;
