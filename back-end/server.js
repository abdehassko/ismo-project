const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
//==================ABDERRAHIM===============================
const filiereRoutes = require("./routes/filiere");
const groupeRoutes = require("./routes/groupe");
const initRoutes = require("./routes/init");
const authRoutes = require("./routes/registration");
const checkEmail = require("./routes/check-email");
const usersRequests = require("./routes/usersRequests");

app.use("/api", initRoutes);
app.use("/api/filieres", filiereRoutes);
app.use("/api/groupes", groupeRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/registration", authRoutes);
app.use("/api", checkEmail);
app.use("/api", usersRequests);

//===========================================================

//=====================IDRISS================================
// dkhol nhad lien bach yetzadolek filieres ogroupes ne db http://localhost:5000/api/init
const annoucements = require("./routes/announcements");

app.use("/api", annoucements);

//===========================================================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
