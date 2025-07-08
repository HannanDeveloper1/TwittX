import { ENV } from "../config/env.js";
const ErrorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log error for debugging
  console.error("Error:", {
    statusCode,
    message,
    stack: err.stack,
    url: req.url,
    method: req.method,
  });

  res.status(statusCode).json({
    success: false,
    message:
      ENV.NODE_ENV === "production" && statusCode === 500
        ? "Internal Server Error"
        : message,
  });
};

export default ErrorMiddleware;
