import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { ENV } from "../config/env.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: [true, "Username is already in use"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email is already in use"],
    },
    password: {
      type: String,
      select: false,
      required: function () {
        return !this.isOAuth;
      },
    },
    privacy: {
      type: String,
      enum: ["public", "private", "friends"],
      default: "public",
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
    profilePicture: {
      type: String,
    },
    coverPicture: {
      type: String,
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    website: {
      type: String,
    },
    age: {
      type: Number,
    },
    pronouns: {
      type: String,
      enum: ["he/him", "she/her", "they/them", "any", "prefer not to say"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id }, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN || "30d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);
export default User;
