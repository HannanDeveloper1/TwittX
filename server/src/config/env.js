import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  DB_URI: process.env.DB_URI,
  REDIS_URL: process.env.REDIS_URL,
};
