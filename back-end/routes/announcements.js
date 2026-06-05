const express = require("express");
const router = express.Router();
const Announcement = require("../models/announcement");
const Notification = require("../models/notification");
const User = require("../models/User");
const { uploadAnnouncement } = require("../middlewares/upload");
const sendEmail = require("../services/emailService");

// GET announcements - FIXED
router.get("/", async (req, res) => {
  try {
    const { groupeId, role } = req.query;
    
    if (role === "admin" || role === "formateur") {
      const announcements = await Announcement.find()
        .populate("filiere")
        .populate("groupe")
        .sort({ createdAt: -1 });
      return res.status(200).json(announcements);
    }

    // For students - show announcements matching their groupe
    const announcements = await Announcement.find({
      groupe: { $in: [groupeId] }
    })
    .populate("filiere")
    .populate("groupe")
    .sort({ createdAt: -1 });

    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST announcement - FIXED
router.post("/", uploadAnnouncement.single("attachment"), async (req, res) => {
  try {
    const { title, description, filiere, groupe } = req.body;
    
    console.log("Creating announcement with data:", { title, description, filiere, groupe });

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const parsedFiliere = filiere ? JSON.parse(filiere) : [];
    const parsedGroupe = groupe ? JSON.parse(groupe) : [];

    const announcement = await Announcement.create({
      title,
      description,
      attachment: req.file ? req.file.filename : null,
      filiere: parsedFiliere,
      groupe: parsedGroupe,
      createdBy: req.user?._id || null, // Use authenticated user
    });

    // Find approved users that belong to the selected filieres OR groupes
    const users = await User.find({
      status: "accepted", // Use 'status' instead of 'isApproved' based on your schema
      $or: [
        { filiere: { $in: parsedFiliere } },
        { groupe: { $in: parsedGroupe } }
      ]
    });

    console.log(`Found ${users.length} users to notify`);

    // Create notifications
    const notifications = users.map((user) => ({
      userId: user._id,
      type: "announcement",
      message: `Nouvelle annonce : ${title}`,
      link: "/announcements",
      isRead: false,
    }));

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }

    // Send emails to users
    for (const user of users) {
      try {
        await sendEmail(
          user.email,
          `Nouvelle annonce : ${title}`,
          `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Nouvelle annonce – Plateforme ISMO</title>
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
          </head>
          <body style="margin:0;padding:0;background-color:#f0f4ff;font-family:'Plus Jakarta Sans',sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f4ff;padding:40px 16px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(14,71,197,0.10);">
                    <tr>
                      <td style="background:linear-gradient(135deg,#0e47c5 0%,#1a6bff 50%,#3d8bff 100%);padding:48px 48px 40px;text-align:center;">
                        <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;">Nouvelle Annonce</h1>
                        <p style="margin:10px 0 0;font-size:15px;color:rgba(255,255,255,0.80);">Une nouvelle annonce vous a été adressée sur ISMO.</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:48px 48px 32px;">
                        <h2 style="margin:0 0 20px;font-size:22px;font-weight:700;color:#0d1b3e;">Bonjour, <span style="color:#1a6bff;">${user.nom} ${user.prenom}</span> 👋</h2>
                        <p style="margin:0 0 24px;font-size:15px;color:#4a5568;line-height:1.75;">
                          Une nouvelle annonce a été publiée sur <strong style="color:#0d1b3e;">ISMO Platform</strong> et vous concerne.
                        </p>
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f8ff;border-left:4px solid #1a6bff;border-radius:0 12px 12px 0;margin-bottom:32px;">
                          <tr>
                            <td style="padding:20px 24px;">
                              <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#1a6bff;text-transform:uppercase;letter-spacing:1px;">Détails de l'annonce</p>
                              <h3 style="margin:0 0 12px;font-size:18px;font-weight:700;color:#0d1b3e;">${title}</h3>
                              <p style="margin:0;font-size:14px;color:#4a5568;line-height:1.7;">${description}</p>
                            </td>
                          </tr>
                        </table>
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                          <tr>
                            <td align="center">
                              <a href="http://localhost/announcements" style="display:inline-block;background:linear-gradient(135deg,#0e47c5,#1a6bff);color:#ffffff;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;text-decoration:none;padding:16px 48px;border-radius:50px;box-shadow:0 6px 20px rgba(26,107,255,0.35);">
                                Voir l'annonce →
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 48px;">
                        <hr style="border:none;border-top:1px solid #eef2ff;margin:0;"/>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:28px 48px 36px;text-align:center;">
                        <p style="margin:0;font-size:11px;color:#c4cdd8;">
                          © 2025 ISMO Platform · Tous droits réservés
                        </p>
                      </td>
                    </tr>
                  记载
                </td>
              </tr>
            </table>
          </body>
          </html>
          `,
        );
        console.log(`Email sent to ${user.email}`);
      } catch (emailError) {
        console.error(`Failed to send email to ${user.email}:`, emailError.message);
      }
    }

    res.status(201).json(announcement);
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put(
  "/:id",
  uploadAnnouncement.single("attachment"),
  async (req, res) => {
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
        { new: true },
      );

      if (!announcement) {
        return res.status(404).json({ message: "Announcement not found" });
      }

      res.status(200).json(announcement);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
);

router.delete("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    await Notification.deleteMany({
      type: "announcement",
      link: "/announcements",
    });

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;