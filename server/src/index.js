import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";
import { connectRedis } from "./config/redis.js";

const PORT = ENV.PORT;

let server;
const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();
    server = app.listen(PORT, () =>
      console.log(`✅ Server running on port ${PORT}`)
    );
  } catch (error) {
    console.log("❌ Server cannot be started due to", error.message);
  }
};

startServer();

const gracefulShutdown = async (signal) => {
  console.log(`❌ ${signal} received. Shutting down gracefully...`);

  if (server) {
    server.close(() => {
      console.log("HTTP server closed");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

// Handling process.on errors and stoping the server gracefully on need
process.on("unhandledRejection", (error) => {
  console.log("❌ Unhandled promise rejection:", error.message);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log("❌ Uncaught exception:", error.message);
  process.exit(1);
});

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
