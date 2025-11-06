const mongoose = require("mongoose");

const vanSchema = new mongoose.Schema(
  {
    plateNumber: { type: String, required: true, unique: true, trim: true },
    model: { type: String, required: true, trim: true },
    seatCapacity: { type: Number, required: true, min: 1 },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } },
);

vanSchema.index({ driverId: 1 });

module.exports = mongoose.model("Van", vanSchema);
