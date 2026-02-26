const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/check-email", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        exists: true,
        message: "Email already exists",
      });
    }

    res.status(200).json({
      exists: false,
      message: "Email available",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
