const express = require("express");
const Filiere = require("../models/Filiere");

const router = express.Router();

// GET all filières
router.get("/", async (req, res) => {
  try {
    const filieres = await Filiere.find();
    res.json(filieres);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
