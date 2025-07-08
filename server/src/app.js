import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { ENV } from "./config/env.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser(ENV.COOKIE_SECRET));

export default app;
