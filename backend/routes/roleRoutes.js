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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, permissions, description } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE roles SET name = ?, permissions = ?, description = ? WHERE id = ?",
      [name, JSON.stringify(permissions), description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.json({ id, name, permissions, description });
  } catch (err) {
    console.error("Error updating role:", err);
    res.status(500).json({ error: "Failed to update role" });
  }
});




module.exports = router;
