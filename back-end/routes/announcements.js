const express = require("express");
const router = express.Router();
const Announcement = require("../models/announcement");

router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const { title, description, attachment, filiere, groupe, createdBy } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // Create announcement with optional fields
    const announcement = await Announcement.create({
      title,
      description,
      attachment: attachment || null,
      filiere: filiere || [],
      groupe: groupe || [],
      createdBy: createdBy || null,
    });

    res.status(201).json(announcement);
  } catch (error) {
    console.error("POST /api/announcements error:", error); // logs in terminal
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
