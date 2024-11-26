const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ error: err.message });
});
