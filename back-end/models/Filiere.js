const mongoose = require("mongoose");

const filiereSchema = new mongoose.Schema({
  nom: { type: String, required: true },
});

module.exports = mongoose.model("Filiere", filiereSchema);
