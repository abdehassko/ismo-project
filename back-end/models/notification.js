const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["announcement", "object", "admin"],
    },
    message: String,
    link: String,
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Notification", notificationSchema);
