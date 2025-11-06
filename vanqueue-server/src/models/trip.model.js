const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    routeId: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
    vanId: { type: mongoose.Schema.Types.ObjectId, ref: "Van", required: true },
    departTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["scheduled", "departed", "completed"],
      default: "scheduled",
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } },
);

tripSchema.index({ routeId: 1, departTime: 1 });
tripSchema.index({ vanId: 1, departTime: 1 });

module.exports = mongoose.model("Trip", tripSchema);
