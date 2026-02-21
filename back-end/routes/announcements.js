const express = require("express");
const router = express.Router();
const Announcement = require("../models/announcement");


router.post("/", async (req, res) => {
  try {
    const { title, description, attachment, filiere, group, createdBy } = req.body;

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
      group: group || [],
      createdBy: createdBy || null,
    });

    res.status(201).json(announcement);
  } catch (error) {
    console.error("POST /api/announcements error:", error); // logs in terminal
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



// ✅ GET all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ GET one announcement
router.get("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ UPDATE announcement
router.put("/:id", async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ DELETE announcement
router.delete("/:id", async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
