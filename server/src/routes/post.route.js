import { Router } from "express";
import { createPost, getPosts } from "../controllers/post.controller.js";
import authorizeMiddleware from "../middlewares/authorize.middleware.js";
import { upload } from "../config/upload.js";

const router = Router();

router.post("/", authorizeMiddleware, upload.array("media", 10), createPost);

router.get("/user", authorizeMiddleware, getPosts);

export default router;
