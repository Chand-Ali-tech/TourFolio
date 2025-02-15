const AppError = require("../utils/appError");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const sharp = require("sharp");

const { upload } = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");

exports.UpdatePhoto = upload.single("photo");
exports.EditUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const fileName = `user-${req.user.id}-${Date.now()}.jpeg`;

  // Create a circular mask
  const circleMask = Buffer.from(
    `<svg width="500" height="500">
      <circle cx="250" cy="250" r="250" fill="white"/>
    </svg>`
  );

  const processedImageBuffer = await sharp(req.file.buffer)
    .resize(500, 500, {
      fit: "cover", // Ensures the image fills 500x500 dimensions
      position: "entropy", // Crops based on most detailed area
    })
    .composite([{ input: circleMask, blend: "dest-in" }]) // Apply circular mask
    .toFormat("jpeg")
    .jpeg({ quality: 90, progressive: true }) // Optimize quality
    .sharpen()
    .modulate({
      brightness: 1.1,
      contrast: 1.2,
    })
    .toBuffer(); // Convert to buffer for upload

  // Upload the processed image to Cloudinary
  const imageUrl = await cloudinary.uploadOnCloudinary(processedImageBuffer, fileName);

  // Save Cloudinary URL to request body for the next middleware
  req.body.photo = imageUrl;

  next();
});

exports.UpdateMe = catchAsync(async (req, res, next) => {
  // Ensure password is not updated here
  if (req.body.password) {
    return next(new AppError("This route is not for password update.", 400));
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "Success",
    user: updatedUser,
  });
});

exports.GetAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  
  res.status(200).json({
    status: "success",
    data: users,
  });
});

exports.DeleteAccount = catchAsync(async (req, res, next) => {
  let userId;
  if (req.user.role === "admin") userId = req.params.id;
  else userId = req.user._id;

  if (!(await User.findById(userId)))
    return next(new AppError("User not found", 404));

  await User.findByIdAndDelete(userId);

  res.status(204).json({
    status: "User is deleted.",
  });
});

exports.GetMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    status: "Success",
    user,
  });
});

exports.GetUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError("User not found", 404));
  res.status(200).json({
    status: "Success",
    user,
  });
});