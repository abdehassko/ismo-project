const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

router.get("/comments/:objectId", async (req, res) => {
  try {
    const comments = await Comment.find({
      objectId: req.params.objectId,
    })
      .populate({
        path: "userId",
        select: "fullName role groupe image",
        populate: { path: "groupe", select: "nom" }, // populate group name
      })
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.post("/comments/", async (req, res) => {
  const { content, object, author } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Commentaire requis" });
  }

  try {
    const comment = new Comment({
      objectId: object,
      userId: author,
      content: content,
    });

    await comment.save();

    res.status(201).json({
      message: "comment envoyée et validé",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
