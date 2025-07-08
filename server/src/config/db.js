import mongoose from "mongoose";

import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.DB_URI);
    console.log("✅ Database connected at", conn.connection.host);
  } catch (error) {
    console.log("❌ Database cannot be connected due to", error.message);
  }
};
