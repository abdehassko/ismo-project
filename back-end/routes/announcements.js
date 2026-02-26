const express = require("express");
const router = express.Router();
const Announcement = require("../models/announcement");
const { uploadAnnouncement } = require("../middleware/upload");

router.get("/", async (req, res) => {
  try {
    const { filiereId, groupeId, role } = req.query;

    if (role === "admin" || role === "formateur") {
      const announcements = await Announcement.find();
      return res.status(200).json(announcements);
    }

    const announcements = await Announcement.find({
      $or: [
        { filiere: { $in: [filiereId] } },
        { groupe: { $in: [groupeId] } },
        { filiere: { $size: 0 }, groupe: { $size: 0 } },
      ],
    });

    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/", uploadAnnouncement.single("attachment"), async (req, res) => {
  try {
    const { title, description, filiere, groupe, createdBy } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const announcement = await Announcement.create({
      title,
      description,
      attachment: req.file ? req.file.filename : null,
      filiere: filiere ? JSON.parse(filiere) : [],
      groupe: groupe ? JSON.parse(groupe) : [],
      createdBy: createdBy || null,
    });

    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/:id", uploadAnnouncement.single("attachment"), async (req, res) => {
  try {
    const { title, description, filiere, groupe } = req.body;

    const updateData = {
      title,
      description,
      filiere: filiere ? JSON.parse(filiere) : [],
      groupe: groupe ? JSON.parse(groupe) : [],
    };

    if (req.file) {
      updateData.attachment = req.file.filename;
    }

    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;