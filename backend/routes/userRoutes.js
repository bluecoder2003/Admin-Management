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

router.put("/:id", async (req, res) => {
  const { id } = req.params; // Extract the ID from the URL
  const { name, email, role_id, status } = req.body; // Get updated data from the body

  // Ensure that the required fields are provided
  if (!name || !email || !role_id || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // SQL query to update user data in the database
  const query = `
    UPDATE users
    SET name = ?, email = ?, role_id = ?, status = ?
    WHERE id = ?
  `;

  try {
    const [result] = await db.query(query, [name, email, role_id, status, id]);

    // If no rows were affected, return a 404
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the updated user data
    res.json({ id, name, email, role_id, status });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});




module.exports = router;
