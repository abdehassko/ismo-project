const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/emailService");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .populate("filiere", "nom")
      .populate("groupe", "nom");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        filiere: user.filiere,
        groupe: user.groupe,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/send-reset-code", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "Email non trouvé" });

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  user.resetCode = code;
  user.resetCodeExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save();

  await sendEmail(
    user.email,
    "Code de réinitialisation du mot de passe",
    `
     <!DOCTYPE html> 
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Réinitialisation du mot de passe – Plateforme ISMO</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:0;background-color:#f0f4ff;font-family:'Plus Jakarta Sans',sans-serif;">

  <!-- Preheader text (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    Vous avez demandé la réinitialisation de votre mot de passe sur la plateforme ISMO.&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌
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

              <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Réinitialisation du mot de passe</h1>
              <p style="margin:10px 0 0;font-size:15px;color:rgba(255,255,255,0.80);font-weight:400;">Suivez les instructions pour créer un nouveau mot de passe.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px 48px 32px;">

              <!-- Greeting -->
              <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:red;text-transform:uppercase;letter-spacing:1.2px;">Sécurité du compte</p>
              <h2 style="margin:0 0 20px;font-size:22px;font-weight:700;color:#0d1b3e;line-height:1.3;">Bonjour, <span style="color:#1a6bff;">${user.fullName}</span> 👋</h2>

              <p style="margin:0 0 24px;font-size:15px;color:#4a5568;line-height:1.75;">
                Nous avons reçu une demande de <strong style="color:#1a6bff;">réinitialisation de votre mot de passe</strong> pour votre compte sur <strong style="color:#0d1b3e;">ISMO Platform</strong>.  
                Si vous êtes à l’origine de cette demande, utilisez le code ci-dessous pour réinitialiser votre mot de passe :
.
              </p>


             <!-- Reset Code -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
  <tr>
    <td align="center">
      <div style="display:inline-block;background:#f4f8ff;border:2px dashed #1a6bff;border-radius:14px;padding:16px 32px;">
        <span style="font-family:'DM Mono',monospace;font-size:26px;font-weight:700;letter-spacing:6px;color:#0d1b3e;">
          ${code}
        </span>
      </div>

      <p style="margin:14px 0 0;font-size:12px;color:green;">
        Ce code est valable pendant <strong>10 minutes</strong>.
      </p>
    </td>
  </tr>
</table>

              <p style="margin:0;font-size:14px;color:#7a8a9e;line-height:1.7;text-align:center;">
                Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer cet email.  
                Votre mot de passe restera inchangé.<br/>
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
                Vous recevez cet email car une demande de réinitialisation du mot de passe a été effectuée pour votre compte sur <strong style="color:#7a8a9e;">ISMO Platform</strong>.<br/>
                Si vous n’avez pas effectué cette demande, veuillez <a href="#" style="color:#1a6bff;text-decoration:none;">nous contacter immédiatement</a>.
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

  res.json({ message: "Code envoyé" });
});

router.post("/reset-password", async (req, res) => {
  const { email, code, password } = req.body;

  const user = await User.findOne({
    email,
    resetCode: code,
    resetCodeExpire: { $gt: Date.now() },
  });

  console.log(user);

  if (!user)
    return res.status(400).json({ message: "Code invalide ou expiré" });

  user.password = password;
  user.resetCode = undefined;
  user.resetCodeExpire = undefined;

  await user.save();

  res.json({ message: "Mot de passe réinitialisé" });
});

module.exports = router;
