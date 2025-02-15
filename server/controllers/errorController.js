const AppError = require("../utils/appError");

const HandleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const HandleDuplicateValues = (error) => {
  const value = Object.values(error.keyValue).join(", ");
  const message = `Duplicate field value: ${value}. Please use a different value.`;
  return new AppError(message, 400);
};

const HandleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const HandleJWTError = () => {
  return new AppError("Invalid token. Please log in again!", 401);
};

const HandleTokenExpiredError = () => {
  return new AppError("Your token has expired. Please log in again!", 401);
};

const HandleMulterError = (err) => {
  const message = `File upload error: ${err.message}`;
  return new AppError(message, 400);
};

const HandleGenericError = (err) => {
  const message = `An unknown error occurred: ${err.message || "No message available."
    }`;
  return new AppError(message, 500);
};

const sendError = (err, res) => {
  console.error("Error: ", err);
  res.status(err.statusCode || 500).json({
    status: err.status, //|| "error",
    message: err.message || "An unknown error occurred.",
  });
};

module.exports = (err, req, res, next) => {

  // Set default error properties
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "An unknown error occurred."

  let error = Object.assign(new AppError(err.message, err.statusCode), err);

  // Error Handlers
  if (error.name === "CastError") error = HandleCastError(error); // Mongoose Cast Error
  if (error.code === 11000) error = HandleDuplicateValues(error); // Mongoose Duplicate Key Error

  if (error.name === "ValidationError") error = HandleValidationError(error); // Mongoose Validation Error
  if (error.name === "JsonWebTokenError") error = HandleJWTError(); // Invalid JWT Token
  if (error.name === "TokenExpiredError") error = HandleTokenExpiredError(); // Expired JWT Token
  if (error.name === "MulterError") error = HandleMulterError(error); // Multer File Upload Error

  // Catch any other error types
  if (!error.isOperational) error = HandleGenericError(error);

  // Send the error response
  sendError(error, res);
};