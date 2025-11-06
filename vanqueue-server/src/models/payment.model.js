const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    queueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Queue",
      required: true,
      unique: true,
    },
    amount: { type: Number, required: true, min: 0 },
    slipUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["waiting", "verified", "rejected"],
      default: "waiting",
      required: true,
    },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } },
);

paymentSchema.index({ status: 1 });

module.exports = mongoose.model("Payment", paymentSchema);
