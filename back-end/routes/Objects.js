const express = require("express");
const router = express.Router();
const Object = require("../models/Object");
const { uploadObject } = require("../middlewares/upload");

// All Active Objects
router.get("/Objects", async (req, res) => {
  try {
    const data = await Object.find({
      status: { $in: ["lost", "found"] },
    }).populate("createdBy", "_id fullName image");
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
    await Object.findByIdAndUpdate(req.params.id, {
      status: "recovered",
    });

    res.json({ message: "Object recovered" });
  } catch (e) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.post(
  "/newObject",
  uploadObject.single("image"), // multer
  async (req, res) => {
    const { titre, description, status, userid } = req.body;
    try {
      const object = new Object({
        title: titre,
        description: description,
        status: status,
        image: req.file ? req.file.filename : null,
        createdBy: userid,
      });

      await object.save();

      res.status(201).json({
        message: "Object envoyée et validé",
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
);

module.exports = router;
