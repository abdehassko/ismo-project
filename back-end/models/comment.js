const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    objectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Object",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Comment", commentSchema);
