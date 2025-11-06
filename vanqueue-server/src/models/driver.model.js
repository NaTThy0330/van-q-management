const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    licenseNo: { type: String, required: true, unique: true, trim: true },
    assignedVan: { type: mongoose.Schema.Types.ObjectId, ref: "Van" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Passenger" },
    role: {
      type: String,
      enum: ["driver"],
      default: "driver",
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } },
);

module.exports = mongoose.model("Driver", driverSchema);
