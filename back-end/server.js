const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ message: "works" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const protectedRoutes = require("./routes/protected");

app.use("/api/protected", protectedRoutes);

const announcementRoutes = require("./routes/announcements");

app.use("/api/announcements", announcementRoutes);
console.log("announcements route registered");
//==================ABDERRAHIM===============================
const filiereRoutes = require("./routes/filiere");
const groupeRoutes = require("./routes/groupe");
const initRoutes = require("./routes/init");
const authRoutes = require("./routes/registration");
const checkEmail = require("./routes/check-email");
const usersRequests = require("./routes/usersRequests");
const Objects = require("./routes/Objects");

app.use("/api", initRoutes);
app.use("/api/filieres", filiereRoutes);
app.use("/api/groupes", groupeRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/registration", authRoutes);
app.use("/api", checkEmail);
app.use("/api", usersRequests);
app.use("/api", Objects);

//===========================================================

//=====================IDRISS================================
// dkhol nhad lien bach yetzadolek filieres ogroupes ne db http://localhost:5000/api/init

const userLogin = require("./routes/userLogin");
app.use("/api/login", userLogin);

//===========================================================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
