import { Router } from "express";
import { updateProfile } from "../controllers/profile.controller";
import authorizeMiddleware from "../middlewares/authorize.middleware.js";

const router = Router();

router.put("/", authorizeMiddleware, updateProfile);

export default router;
