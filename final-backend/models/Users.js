const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "manager", "agent", "client"],
    default: "client",
  },
  passwordResetOTP: {
    type: String,
  },

  passwordResetExpiry: {
    type: Date,
  },

  image: {
    url: String,
    public_id: String,
  },

  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: false },
  quotaPerDay: { type: Number },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
