const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    url: {
      type: String,
      required: true,
    },

    riskScore: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Safe", "Suspicious", "Dangerous"],
      default: "Safe",
    },

    threats: {
      type: [String],
      default: [],
    },

    recommendation: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Scan", scanSchema);