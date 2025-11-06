const mongoose = require("mongoose");
const config = require("./env");

mongoose.set("strictQuery", true);

const connectDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    const connection = await mongoose.connect(config.mongoUri, {
      dbName: config.env === "test" ? "vanqueue_test" : undefined,
    });
    return connection.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

module.exports = connectDatabase;
