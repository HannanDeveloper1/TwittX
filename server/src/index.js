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
