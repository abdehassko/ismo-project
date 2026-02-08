const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const upload = require("../middlewares/uploadUserImage");

const router = express.Router();

router.post(
  "/register",
  upload.single("image"), // 👈 multer
  async (req, res) => {
    const { nom, email, filiere, groupe, role, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        fullName: nom,
        email: email,
        password: hashedPassword,
        filiere: filiere,
        groupe: groupe,
        role: role,
        image: req.file ? req.file.filename : null,
        isApproved: false,
      });

      await user.save();

      res.status(201).json({
        message: "Inscription envoyée, en attente de validation",
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
);

module.exports = router;
