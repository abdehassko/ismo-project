const express = require("express");
const Groupe = require("../models/Groupe");

const router = express.Router();

// GET groupes by filière
router.get("/:filiereId", async (req, res) => {
  try {
    const groupes = await Groupe.find({
      filiereId: req.params.filiereId,
    });
    res.json(groupes);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
