const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");
const { promisify } = require("util");
const dotenv = require('dotenv')
const axios = require("axios");

dotenv.config();


const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_Secret, {
    expiresIn: process.env.JWT_Expires_In,
  });
};

const CreateSendToken = async (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  };

  res.cookie("jwt", token, cookieOptions);

  // const populatedUser = await user.populate("favouriteTours");

  res.status(statusCode).json({
    status: "success",
    token,
    user//: populatedUser,
  });
};

const Store = new Map();

exports.Signup = catchAsync(async (req, res, next) => {
  const { name, email, password, recaptchaToken } = req.body;
  console.log(name, email, password, recaptchaToken);


  if (!recaptchaToken) {
    return next(new AppError("Invalid reCAPTCHA token!", 412));
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Store this in .env

  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify`,
    `secret=${secretKey}&response=${recaptchaToken}`,
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  if (!response.data || !response.data.success) {
    console.error("reCAPTCHA verification failed:", response.data);
    return next(new AppError("Invalid reCAPTCHA response!", 412));
  }


  const isExists = await User.findOne({ email });
  if (isExists) {
    return next(new AppError("Email already exists!", 400));
  }

  // Generate OTP
  const OTP = Math.floor(10000 + Math.random() * 90000);

  Store.set(email, {
    name,
    email,
    password,
    code: OTP,
    expires: Date.now() + 10 * 60 * 1000, // 10 minutes expiration
  });

  // Send the code to the user's email
  await sendEmail({
    email,
    subject: "OTP code",
    message: `Your OTP is ${OTP} 😀. It will expire in 10 minutes.`,
  });

  res.status(200).json({
    status: "success",
    message:
      "Verification code sent to your email. Please verify to complete signup.",
  });
});

exports.VerifyAndRegister = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  const storedData = Store.get(email);

  if (!storedData) {
    return next(
      new AppError("Invalid email or no pending verification request!", 400)
    );
  }

  const { name, password, code, expires } = storedData;

  // Check if the code matches and is not expired
  if (code !== Number(otp) || expires < Date.now()) {
    return next(new AppError("Invalid or expired verification code!", 400));
  }

  Store.delete(email);

  const user = await User.create({ name, email, password });
  CreateSendToken(user, 201, res);
});

exports.Login = catchAsync(async (req, res, next) => {
  const { email, password, recaptchaToken } = req.body;

  if (!recaptchaToken) {
    return next(new AppError("Invalid reCAPTCHA token!", 400));
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Store this in .env

  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify`,
    `secret=${secretKey}&response=${recaptchaToken}`,
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  if (!response.data.success) {
    return next(new AppError("Invalid reCAPTCHA response!", 400));
  }

  const user = await User.findOne({ email }).select("+password").populate('favouriteTours')

  if (!user) {
    return next(new AppError("User does not exists!", 401));
  }

  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password.", 401));
  }

  CreateSendToken(user, 200, res);
});

exports.Logout = (req, res) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now() + 10),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully!",
  });
};

exports.Protect = catchAsync(async (req, res, next) => {
  console.log("hello from protect!");

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log("Token: in req.headers:-", token);
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("You are not logged in! Please log in to get access.", 401));
  }

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_Secret);

  // Check if the user still exists
  const currentUser = await User.findById(decoded.id).select('+role').populate('favouriteTours')
  if (!currentUser) {
    return next(new AppError("The user belonging to this token does not exist.", 401));
  }

  req.user = currentUser;
  next();
});

exports.RestrictTo = (...roles) => {

  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action.", 403)
      );
    }
    next();
  };
};
