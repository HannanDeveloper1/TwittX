import Post from "../models/post.model.js";
import { imageKit } from "../config/upload.js";
import ErrorHandler from "../lib/errors/ErrorHandler.js";
import asyncHandler from "express-async-handler";

export const createPost = asyncHandler(async (req, res, next) => {
  // Accept both req.body.body (from validation) and req.body (from FormData)
  let content, visibility;
  if (req.body.body) {
    content = req.body.body.content;
    visibility = req.body.body.visibility;
  } else {
    content = req.body.content;
    visibility = req.body.visibility;
  }
  const user = req.user;
  const files = req.files || [];

  // At least one of content or media is required
  if (!content && (!files || files.length === 0)) {
    return next(
      new ErrorHandler(
        400,
        "Either content or at least one image is required to create a post."
      )
    );
  }

  // Upload images to ImageKit and get URLs
  let mediaUrls = [];
  if (files && files.length > 0) {
    const uploadPromises = files.map((file) =>
      imageKit.upload({
        file: file.buffer,
        fileName: `${user._id}_${Date.now()}_${file.originalname}`,
        folder: "/twittx/posts",
      })
    );
    const uploadResults = await Promise.all(uploadPromises);
    mediaUrls = uploadResults.map((result) => result.url);
  }

  // Create the post
  const post = await Post.create({
    content: content || "",
    media: mediaUrls,
    privacy: visibility || "public",
    user: user._id,
  });

  res.status(201).json({
    success: true,
    message: "Post created successfully!",
    post,
  });
});

export const getPosts = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    message: "Posts fetched successfully!",
    posts,
  });
});
