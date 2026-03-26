const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { authMiddleware, authorizeRoles } = require("../middlewares/auth");
const sendEmail = require("../services/emailService");

// Registration requests
router.get(
  "/usersRequests",
  authMiddleware,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const data = await User.find({ isApproved: false })
        .populate("groupe", "nom")
        .populate("filiere", "nom");
      if (data) {
        res.json(data);
      }
    } catch (e) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
);

// Accept user
router.put(
  "/accept-user/:id",
  authMiddleware,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        isApproved: true,
      });

      res.json({ message: "User accepted" });

      const user = await User.findById(req.params.id).populate("groupe");

      await sendEmail(
        user.email,
        `${user.fullName} Bienvenue sur la plateforme ISMO`,
        `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Compte approuvé – Plateforme ISMO</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:0;background-color:#f0f4ff;font-family:'Plus Jakarta Sans',sans-serif;">

  <!-- Preheader text (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    Votre compte sur la plateforme ISMO a été approuvé. Bienvenue parmi nous !&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌
  </div>

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f4ff;padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(14,71,197,0.10);">

          <!-- Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg,#0e47c5 0%,#1a6bff 50%,#3d8bff 100%);padding:48px 48px 40px;text-align:center;position:relative;">

             

              <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Compte approuvé !</h1>
              <p style="margin:10px 0 0;font-size:15px;color:rgba(255,255,255,0.80);font-weight:400;">Vous faites officiellement partie de la plateforme ISMO.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px 48px 32px;">

              <!-- Greeting -->
              <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#1a6bff;text-transform:uppercase;letter-spacing:1.2px;">Bienvenue à bord</p>
              <h2 style="margin:0 0 20px;font-size:22px;font-weight:700;color:#0d1b3e;line-height:1.3;">Bonjour, <span style="color:#1a6bff;">${user.fullName}</span> 👋</h2>

              <p style="margin:0 0 24px;font-size:15px;color:#4a5568;line-height:1.75;">
                Nous sommes ravis de vous informer que votre demande pour rejoindre <strong style="color:#0d1b3e;">ISMO Platform</strong> a été examinée et officiellement <strong style="color:#1a6bff;">approuvée</strong>. Votre compte est maintenant entièrement activé et prêt à être utilisé.
              </p>

              <!-- Info card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f8ff;border-left:4px solid #1a6bff;border-radius:0 12px 12px 0;margin-bottom:32px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#1a6bff;text-transform:uppercase;letter-spacing:1px;">Détails de votre compte</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding:4px 0;">
                          <span style="font-size:13px;color:#7a8a9e;font-weight:500;">Email</span>
                        </td>
                        <td align="right">
                          <span style="font-family:'DM Mono',monospace;font-size:13px;color:#0d1b3e;font-weight:500;">${user.email}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;border-top:1px solid #dce8ff;">
                          <span style="font-size:13px;color:#7a8a9e;font-weight:500;">Votre groupe</span>
                        </td>
                        <td align="right" style="border-top:1px solid #dce8ff;">
                          <span style="font-family:'DM Mono',monospace;font-size:13px;color:#0d1b3e;">${user.groupe.nom}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;border-top:1px solid #dce8ff;">
                          <span style="font-size:13px;color:#7a8a9e;font-weight:500;">Votre rôle</span>
                        </td>
                        <td align="right" style="border-top:1px solid #dce8ff;">
                          <span style="font-family:'DM Mono',monospace;font-size:13px;color:#0d1b3e;">${user.role}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;border-top:1px solid #dce8ff;">
                          <span style="font-size:13px;color:#7a8a9e;font-weight:500;">Statut du compte</span>
                        </td>
                        <td align="right" style="border-top:1px solid #dce8ff;">
                          <span style="background:#e6f4ea;color:#1e7e34;font-size:12px;font-weight:700;padding:3px 10px;border-radius:20px;">● Actif</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td align="center">
                    <a href="https://ismotetouan.netlify.app/login" style="display:inline-block;background:linear-gradient(135deg,#0e47c5,#1a6bff);color:#ffffff;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;text-decoration:none;padding:16px 48px;border-radius:50px;letter-spacing:0.3px;box-shadow:0 6px 20px rgba(26,107,255,0.35);">
                      Accéder à mon compte →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;color:#7a8a9e;line-height:1.7;text-align:center;">
                Besoin d’aide pour commencer ? Notre équipe de support est toujours là pour vous aider.<br/>
                <a href="mailto:support@ismo-platform.com" style="color:#1a6bff;font-weight:600;text-decoration:none;">support@ismo-platform.com</a>
              </p>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 48px;">
              <hr style="border:none;border-top:1px solid #eef2ff;margin:0;"/>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 48px 36px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:#aab4c8;line-height:1.6;">
                Vous recevez cet email parce que votre compte sur <strong style="color:#7a8a9e;">ISMO Platform</strong> a été approuvé.<br/>
                Si vous ne vous êtes pas inscrit, veuillez <a href="#" style="color:#1a6bff;text-decoration:none;">nous contacter immédiatement</a>.
              </p>
              <p style="margin:0;font-size:11px;color:#c4cdd8;">
                © 2025 ISMO Platform · Tous droits réservés<br/>
                <a href="#" style="color:#aab4c8;text-decoration:none;">Politique de confidentialité</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="#" style="color:#aab4c8;text-decoration:none;">Conditions d’utilisation</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="#" style="color:#aab4c8;text-decoration:none;">Se désinscrire</a>
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>
        `,
      );
    } catch (e) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
);

// Reject user
router.delete(
  "/reject-user/:id",
  authMiddleware,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "User rejected" });
    } catch (e) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
);
module.exports = router;
