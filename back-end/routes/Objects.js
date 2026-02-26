const express = require("express");
const router = express.Router();
const Object = require("../models/Object");

// All Active Objects
router.get("/Objects", async (req, res) => {
  try {
    const data = await Object.find({
      status: { $in: ["lost", "found"] },
    }).populate("createdBy", "fullName image");
    if (data) {
      res.json(data);
    } else {
      res.json({});
    }
  } catch (e) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// marque comme recuperer
router.put("/recovered/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      status: "recovered",
    });

    res.json({ message: "Object recovered" });
  } catch (e) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
