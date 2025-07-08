import jwt from "jsonwebtoken";

import { ENV } from "../config/env.js";

const authorizeMiddleware = async (err, req, res, next) => {
  const token = req.cookies.jid;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  jwt.verify(token, ENV.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.user = decoded;
    next();
  });
};

export default authorizeMiddleware;
