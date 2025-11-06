const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const config = require("./config/env");
const connectDatabase = require("./config/database");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: config.corsOrigins.length ? config.corsOrigins : "*",
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

const start = async () => {
  try {
    await connectDatabase();
    server.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.error("Server failed to start", error);
    process.exit(1);
  }
};

if (require.main === module) {
  start();
}

module.exports = { server, start };
