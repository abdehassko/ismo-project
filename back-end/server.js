import express from "express";
import cors from "cors";
import announcementsRoutes from "./routes/announcements.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", announcementsRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
