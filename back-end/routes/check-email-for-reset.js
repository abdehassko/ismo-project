const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/check-email-for-reset", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(409).json({
        exists: false,
        message: "Email no available",
      });
    }

    res.status(200).json({
      exists: true,
      message: "Email exists",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
