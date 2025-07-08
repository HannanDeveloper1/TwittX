import ErrorHandler from "../lib/errors/ErrorHandler.js";

const validateBody = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    next(new ErrorHandler(400, error.message));
  }
};

export default validateBody;
