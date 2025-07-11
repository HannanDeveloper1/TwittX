import asyncHandler from "express-async-handler";

import User from "../models/user.model.js";
import ErrorHandler from "../lib/errors/ErrorHandler.js";
import { ENV } from "../config/env.js";

export const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  //   check for existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    next(new ErrorHandler(400, "Email is already in use"));
  }

  let username;

  if (name.includes(" ")) {
    username =
      name
        .toLowerCase()
        .split(" ")
        .map((word) => word[0] + word.slice(1))
        .join("") + Math.floor(Math.random() * 1000000000);
  } else {
    username = name.toLowerCase().slice(1) + Math.floor(Math.random() * 10000);
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
  });

  const token = user.generateToken();

  res
    .status(201)
    .cookie("jid", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "lax",
      credentials: true,
    })
    .json({
      success: true,
      message: "Signed Up successfully",
      user,
    });
});

export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    next(new ErrorHandler(400, "Invalid Email or Password"));
  }

  if (!user.comparePassword(password)) {
    next(new ErrorHandler(400, "Invalid Email or Password"));
  }

  const token = user.generateToken();

  res
    .status(200)
    .cookie("jid", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "lax",
      credentials: true,
    })
    .json({
      success: true,
      message: "Signed In successfully",
      user,
    });
});

export const signOut = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .clearCookie("jid", {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "lax",
    })
    .json({
      success: true,
      message: "Signed Out successfully",
    });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id });
  if (!user) {
    next(new ErrorHandler(400, "Unauthorized"));
  }

  res.status(200).json({ success: true, user, message: "User logged in" });
});
