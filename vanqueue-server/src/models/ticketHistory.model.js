const mongoose = require("mongoose");

const ticketHistorySchema = new mongoose.Schema(
  {
    passengerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Passenger",
      required: true,
    },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    queueId: { type: mongoose.Schema.Types.ObjectId, ref: "Queue", required: true },
    ticketCode: { type: String, required: true, trim: true },
    issuedAt: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } },
);

ticketHistorySchema.index({ passengerId: 1, issuedAt: -1 });

module.exports = mongoose.model("TicketHistory", ticketHistorySchema);
