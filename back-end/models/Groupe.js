const mongoose = require("mongoose");

const groupeSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  filiereId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Filiere",
    required: true,
  },
});

module.exports = mongoose.model("Groupe", groupeSchema);
