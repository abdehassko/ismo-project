const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Registration requests
router.get("/usersRequests", async (req, res) => {
  try {
    const data = await User.find({ isApproved: false })
      .populate("groupe", "nom")
      .populate("filiere", "nom");
    if (data) {
      res.json(data);
    }
  } catch (e) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Accept user
router.put("/accept-user/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      isApproved: true,
    });

    res.json({ message: "User accepted" });
  } catch (e) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Reject user
router.delete("/reject-user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User rejected" });
  } catch (e) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});
module.exports = router;
