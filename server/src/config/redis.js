import { createClient } from "redis";
import { ENV } from "./env.js";

export const client = createClient({
  url: ENV.REDIS_URL,
});

client.on("error", function (error) {
  console.log("Can't connected to REDIS due to", error.message);
});

export const connectRedis = async () => {
  try {
    await client.connect();
    console.log("✅ Redis connected");
  } catch (error) {
    console.log("Can't connected to REDIS due to", error.message);
  }
};
