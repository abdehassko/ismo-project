const express = require("express");
const Filiere = require("../models/Filiere");
const Groupe = require("../models/Groupe");
const User = require("../models/User"); // Add this import
const bcrypt = require("bcrypt"); // Add this import if not already imported

const router = express.Router();

router.get("/init", async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@ismo.com" });
    
    if (!existingAdmin) {
      // Create admin user
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        nom: "Admin",
        prenom: "ISMO",
        email: "admin@ismo.com",
        password: hashedPassword,
        role: "admin",
        status: "accepted",
        filiere: "Admin",
        telephone: "0600000000"
      });
      console.log("Admin user created ✅");
    }

    // Create filières
    const dd = await Filiere.create({ nom: "Développement Digital" });
    const id = await Filiere.create({ nom: "Infrastructure Digitale" });
    const info = await Filiere.create({ nom: "Infographie prépresse" });
    const ia = await Filiere.create({ nom: "Intelligence Artificielle" });
    const tca = await Filiere.create({
      nom: "Téléconseiller Centres d'Appels",
    });

    // Développement Digital groupes
    await Groupe.create({ nom: "DEV101", filiereId: dd._id });
    await Groupe.create({ nom: "DEV102", filiereId: dd._id });
    await Groupe.create({ nom: "DEVOWFS201", filiereId: dd._id });
    await Groupe.create({ nom: "DEVOWFS202", filiereId: dd._id });

    // Intelligence Artificielle groupes
    await Groupe.create({ nom: "IA101", filiereId: ia._id });
    await Groupe.create({ nom: "IAADA201", filiereId: ia._id });

    // Infrastructure Digitale groupes
    await Groupe.create({ nom: "ID101", filiereId: id._id });
    await Groupe.create({ nom: "ID102", filiereId: id._id });
    await Groupe.create({ nom: "ID103", filiereId: id._id });
    await Groupe.create({ nom: "IDOCS201", filiereId: id._id });
    await Groupe.create({ nom: "IDOSR201", filiereId: id._id });
    await Groupe.create({ nom: "IDOSR202", filiereId: id._id });

    // Infographie prépresse groupes
    await Groupe.create({ nom: "INFO101", filiereId: info._id });
    await Groupe.create({ nom: "MIR201", filiereId: info._id });
    await Groupe.create({ nom: "MIR301", filiereId: info._id });

    // Téléconseiller Centres d'Appels groupes
    await Groupe.create({ nom: "TCA101", filiereId: tca._id });
    await Groupe.create({ nom: "TCPI101", filiereId: tca._id });

    res
      .status(200)
      .send("Database initialized with filières, groupes and admin account ✅");
  } catch (error) {
    console.error(error);
    res.status(500).send("Initialization failed ❌");
  }
});

module.exports = router;