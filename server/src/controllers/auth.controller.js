import asyncHandler from "express-async-handler";

import User from "../models/user.model.js";
import ErrorHandler from "../lib/errors/ErrorHandler.js";
import { ENV } from "../config/env.js";

export const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  //   check for existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    next(new ErrorHandler(400, "User already exists"));
  }

  let username;

  if (name.includes(" ")) {
    username =
      name
        .split(" ")
        .map((word) => word[0] + word.slice(1))
        .join("") + new Date();
  } else {
    username = +name.slice(1) + new Date();
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
    .json({
      success: true,
      message: "Signed Up successfully",
      user,
    })
    .cookie("jid", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "lax",
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
    .json({
      success: true,
      message: "Signed In successfully",
      user,
    })
    .cookie("jid", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "lax",
    });
});
