import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
};
