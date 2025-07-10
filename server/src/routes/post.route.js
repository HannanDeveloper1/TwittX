import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";
import authorizeMiddleware from "../middlewares/authorize.middleware.js";
import validateBody from "../middlewares/validateBody.middleware.js";
import { createPostSchema } from "../lib/validation/post.validation.js";
import { upload } from "../config/upload.js";

const router = Router();

router.post(
  "/",
  authorizeMiddleware,
  validateBody(createPostSchema),
  upload.array("media", 10),
  createPost
);

export default router;
