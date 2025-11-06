const dotenv = require("dotenv");

dotenv.config();

const required = ["MONGODB_URI", "JWT_SECRET", "CLIENT_URL"];

const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "4000", 10),
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/vanqueue",
  jwtSecret: process.env.JWT_SECRET || "change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  corsOrigins: (process.env.CORS_ORIGINS || process.env.CLIENT_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  logLevel: process.env.LOG_LEVEL || "dev",
};

if (config.env !== "test") {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    console.warn(
      `Warning: missing environment variables ${missing.join(", ")}. Using fallback defaults.`,
    );
  }
}

module.exports = config;
