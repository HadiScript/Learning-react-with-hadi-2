const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    required: true,
  },

  status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved", "Reopened"],
    default: "Open",
  },

  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  pickedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  currentAgent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  escalated: { type: Boolean, default: false },
  pickedAt: { type: Date }, //(diff btw createdAt - picked at (current timr))

  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  reopenCount: { type: Number, default: 0 },
  firstSLABreach: { type: Boolean, default: false },
  secondSLABreach: { type: Boolean, default: false },
  firstRespondedAt: { type: Date }, // Timestamp for the first response

  images: [{ type: String }],

  movements: [
    {
      status: { type: String }, //escalated
      why: { type: String }, //reason
      movedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //escalate
      movementAt: { type: Date, default: Date.now }, // Timestamp when escalated
      movedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],

  resolvedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
