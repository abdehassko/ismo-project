const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
