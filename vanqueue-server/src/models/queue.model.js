const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
  {
    passengerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Passenger",
      required: true,
    },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
    queueType: {
      type: String,
      enum: ["normal", "standby"],
      default: "normal",
      required: true,
    },
    seatNo: { type: Number, min: 1 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } },
);

queueSchema.index({ tripId: 1, passengerId: 1 }, { unique: true });

module.exports = mongoose.model("Queue", queueSchema);
