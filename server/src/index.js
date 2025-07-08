import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";

const PORT = ENV.PORT;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (error) {
    console.log("❌ Server cannot be started due to", error.message);
  }
};

startServer();

// Handling process.on errors and stoping the server gracefully on need
process.on("unhandledRejection", (error) => {
  console.log("❌ Server cannot be started due to", error.message);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log("❌ Server cannot be started due to", error.message);
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("❌ Server cannot be started due to", error.message);
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("❌ Server cannot be started due to", error.message);
  process.exit(1);
});

process.on("exit", () => {
  console.log("❌ Server cannot be started due to", error.message);
});

process.on("SIGHUP", () => {
  console.log("❌ Server cannot be started due to", error.message);
  process.exit(1);
});

process.on("SIGKILL", () => {
  console.log("❌ Server cannot be started due to", error.message);
  process.exit(1);
});
