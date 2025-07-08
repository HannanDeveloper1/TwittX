import express from "express";

import {
  getUser,
  signIn,
  signOut,
  signUp,
} from "../controllers/auth.controller.js";
import authorizeMiddleware from "../middlewares/authorize.middleware.js";
import validateBody from "../middlewares/validateBody.middleware.js";
import {
  signInSchema,
  signUpSchema,
} from "../lib/validation/auth.validation.js";

const router = express.Router();

router.post("/signup", validateBody(signUpSchema), signUp);

router.post("/signin", validateBody(signInSchema), signIn);

router.get("/signout", signOut);

router.get("/", authorizeMiddleware, getUser);

export default router;
