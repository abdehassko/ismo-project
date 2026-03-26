const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const Object = require("../models/Object");
const Notification = require("../models/notification");
const User = require("../models/User");
const sendEmail = require("../services/emailService");

router.get("/comments/:objectId", async (req, res) => {
  try {
    const comments = await Comment.find({
      objectId: req.params.objectId,
    })
      .populate({
        path: "userId",
        select: "fullName role groupe image",
        populate: { path: "groupe", select: "nom" },
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

    // get the object to find its owner
    const foundObject = await Object.findById(object).populate("createdBy");

    if (foundObject && foundObject.createdBy._id.toString() !== author) {
      // create notification
      await Notification.create({
        userId: foundObject.createdBy._id,
        type: "object",
        message: `Quelqu'un a commenté sur votre objet : "${foundObject.title}"`,
        link: "/objects",
        isRead: false,
      });

      // get commenter info
      const commenter = await User.findById(author);

      // send email to object owner
      await sendEmail(
        foundObject.createdBy.email,
        `Nouveau commentaire sur votre objet : ${foundObject.title}`,
        `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Nouveau commentaire – Plateforme ISMO</title>
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
        </head>
        <body style="margin:0;padding:0;background-color:#f0f4ff;font-family:'Plus Jakarta Sans',sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f4ff;padding:40px 16px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(14,71,197,0.10);">
                  <tr>
                    <td style="background:linear-gradient(135deg,#0e47c5 0%,#1a6bff 50%,#3d8bff 100%);padding:48px 48px 40px;text-align:center;">
                      <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;">Nouveau Commentaire</h1>
                      <p style="margin:10px 0 0;font-size:15px;color:rgba(255,255,255,0.80);">Quelqu'un a commenté sur votre objet.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:48px 48px 32px;">
                      <h2 style="margin:0 0 20px;font-size:22px;font-weight:700;color:#0d1b3e;">Bonjour, <span style="color:#1a6bff;">${foundObject.createdBy.fullName}</span> 👋</h2>
                      <p style="margin:0 0 24px;font-size:15px;color:#4a5568;line-height:1.75;">
                        <strong style="color:#0d1b3e;">${commenter?.fullName || "Un utilisateur"}</strong> a commenté sur votre objet.
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f8ff;border-left:4px solid #1a6bff;border-radius:0 12px 12px 0;margin-bottom:32px;">
                        <tr>
                          <td style="padding:20px 24px;">
                            <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#1a6bff;text-transform:uppercase;letter-spacing:1px;">Détails</p>
                            <p style="margin:0 0 8px;font-size:14px;color:#0d1b3e;"><strong>Objet :</strong> ${foundObject.title}</p>
                            <p style="margin:0;font-size:14px;color:#4a5568;"><strong>Commentaire :</strong> ${content}</p>
                          </td>
                        </tr>
                      </table>
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                        <tr>
                          <td align="center">
                            <a href="https://ismotetouan.netlify.app/objects" style="display:inline-block;background:linear-gradient(135deg,#0e47c5,#1a6bff);color:#ffffff;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;text-decoration:none;padding:16px 48px;border-radius:50px;box-shadow:0 6px 20px rgba(26,107,255,0.35);">
                              Voir l'objet →
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
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
        `,
      );
    }

    res.status(201).json({
      message: "comment envoyée et validé",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
