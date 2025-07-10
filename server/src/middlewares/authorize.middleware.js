import jwt from "jsonwebtoken";

import { ENV } from "../config/env.js";
import ErrorHandler from "../lib/errors/ErrorHandler.js";
import User from "../models/user.model.js";

const authorizeMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jid;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ErrorHandler(401, "Unauthorized"));
  }
};

export default authorizeMiddleware;
