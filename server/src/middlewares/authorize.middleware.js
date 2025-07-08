import jwt from "jsonwebtoken";

import { ENV } from "../config/env.js";
import ErrorHandler from "../lib/errors/ErrorHandler.js";

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
    req.user = decoded;
    next();
  } catch (error) {
    next(new ErrorHandler(401, "Unauthorized"));
  }
};

export default authorizeMiddleware;
