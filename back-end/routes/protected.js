// routes/protected.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware, (req, res) => {
  // Only accessible with a valid JWT
  res.json({
    message: "This is a protected route",
    user: req.user,
  });
});

module.exports = router;
