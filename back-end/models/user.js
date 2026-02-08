const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    filiere: { type: mongoose.Schema.Types.ObjectId, ref: "Filiere" },
    groupe: { type: mongoose.Schema.Types.ObjectId, ref: "Groupe" },
    role: {
      type: String,
      enum: ["admin", "student", "formateur"],
      default: "student",
    },
    image: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
