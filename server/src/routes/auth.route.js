import express from "express";

import {
  getUser,
  signIn,
  signOut,
  signUp,
} from "../controllers/auth.controller.js";
import authorizeMiddleware from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/signout", signOut);

router.get("/", authorizeMiddleware, getUser);

export default router;
