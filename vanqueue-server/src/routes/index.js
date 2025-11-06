const express = require("express");
const authRoutes = require("./auth.routes");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/health", (req, res) =>
  res.json({
    success: true,
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  }),
);

router.use("/auth", authRoutes);

router.get(
  "/admin/ping",
  authenticate,
  authorize("admin"),
  (req, res) =>
    res.json({
      success: true,
      message: "Admin route reachable",
    }),
);

module.exports = router;
