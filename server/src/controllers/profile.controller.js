import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const {
    name,
    username,
    bio,
    profilePicture,
    coverPicture,
    location,
    website,
  } = req.body;

  if (user) {
    user.name = name || user.name;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.profilePicture = profilePicture || user.profilePicture;
    user.coverPicture = coverPicture || user.coverPicture;
    user.location = location || user.location;
    user.website = website || user.website;
    await user.save();
    res.status(200).json({ success: true, message: "Profile updated" });
  }
});
