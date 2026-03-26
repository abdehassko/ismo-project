const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/uploads/announcements", express.static("uploads/announcements"));
app.use("/uploads/users", express.static("uploads/users"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

mongoose.connection.once('open', async () => {
  console.log("✅ Connected DB:", mongoose.connection.name);

  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log("📦 Collections:", collections.map(c => c.name));
});

// announcements
const announcementRoutes = require("./routes/announcements");
app.use("/api/announcements", announcementRoutes);

// notifications
const notificationRoutes = require("./routes/notifications");
app.use("/api/notifications", notificationRoutes);

// abderrahim
const filiereRoutes = require("./routes/filiere");
const groupeRoutes = require("./routes/groupe");
const initRoutes = require("./routes/init");
const authRoutes = require("./routes/registration");
const checkEmail = require("./routes/check-email");
const Objects = require("./routes/Objects");
const usersRequests = require("./routes/usersRequests");
const Comments = require("./routes/comments");
const checkEmailForReset = require("./routes/check-email-for-reset");

app.use("/api", initRoutes);
app.use("/api/filieres", filiereRoutes);
app.use("/api/groupes", groupeRoutes);
app.use("/api/registration", authRoutes);
app.use("/api", checkEmail);
app.use("/api", usersRequests);
app.use("/api", Objects);
app.use("/api", Comments);
app.use("/api", checkEmailForReset);

// idriss
const userLogin = require("./routes/userLogin");
const userModify = require("./routes/userModify");

app.use("/api/login", userLogin);
app.use("/api/users", userModify);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
