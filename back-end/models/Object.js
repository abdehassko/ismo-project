const mongoose = require("mongoose");

const objectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: {
      type: String,
      enum: ["phone", "wallet", "bag", "other"],
    },
    image: String,
    status: {
      type: String,
      enum: ["lost", "found", "recovered"],
      default: "lost",
    },
    location: String,
    filiere: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Object", objectSchema);
