const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const f = require("./routes/filiere");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const filiereRoutes = require("./routes/filiere");
const groupeRoutes = require("./routes/groupe");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/filieres", filiereRoutes);
app.use("/api/groupes", groupeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
