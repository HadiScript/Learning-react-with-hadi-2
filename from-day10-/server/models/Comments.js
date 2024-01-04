const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
});

module.exports = mongoose.model("Comment", commentSchema);
