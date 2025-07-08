import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import ErrorMiddleware from "./middlewares/error.middleware.js";
import { ENV } from "./config/env.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser(ENV.COOKIE_SECRET));

app.get("/", (req, res, next) => {
  res.status(200).json("Welcome from TwittX API");
});
app.use("/api/auth", authRoutes);

app.use(ErrorMiddleware);

export default app;
