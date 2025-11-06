const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    origin: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    distanceKm: { type: Number, required: true, min: 0 },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } },
);

routeSchema.index({ origin: 1, destination: 1 }, { unique: true });

module.exports = mongoose.model("Route", routeSchema);
