const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/usersRequests", async (req, res) => {
  try {
    const data = await User.find({ isApproved: false });
    if (data) {
      res.json(data);
    }
  } catch (e) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});
module.exports = router;
