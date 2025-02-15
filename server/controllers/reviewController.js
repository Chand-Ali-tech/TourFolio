const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Review = require("../models/reviewModel");
const Tour = require("../models/tourModel");
const User = require("../models/userModel");

exports.GetAllReviews = catchAsync(async (req, res, next) => {
  const tourId = req.params.tourid;


  if (!(await Tour.findById(tourId))) {
    return next(new AppError("Tour not found", 404));
  }
  const reviews = await Review.find({ tour: tourId }).populate({
    path: "user",
  });

  if (!reviews) {
    return next(new AppError("No reviews found", 404));
  }

  res.status(200).json({
    status: "success",
    length: reviews.length,
    data: reviews,
  });
});

exports.AddReview = catchAsync(async (req, res, next) => {
  const tourId = req.params.tourid;
  const userId = req.user._id;
  const tour = await Tour.findById(tourId)
  if (!tour || !(await User.findById(userId))) {
    return next(new AppError("Tour or User not found", 404));
  }

  const review = await Review.create({
    ...req.body,
    tour: tourId,
    user: userId,
  });

  // Update the Tour with two changes. Increase ratingQuantity by 1 and recalculate averageRating
  await Tour.findByIdAndUpdate(tourId, {
    $inc: { ratingQuantity: 1 },
    $set: {
      averageRating: (tour.averageRating * tour.ratingQuantity + review.rating) / (tour.ratingQuantity + 1)
    }
  });


  res.status(201).json({
    status: "success",
    data: {
      review, 
    },
  });

});

exports.DeleteReview = catchAsync(async (req, res, next) => {
  const tourId = req.params.tourid;
  const reviewId = req.params.id;

  if (!(await Tour.findById(tourId))) {
    return next(new AppError("Tour not found", 404));
  }

  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new AppError("Review not found", 404));
  }

  // Check if the user is the owner of the review or an admin
  if (review.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return next(new AppError("You are not allowed to delete this review", 401));
  }

  await Review.findByIdAndDelete(reviewId);

  res.status(204).json({
    status: "success",
    message: "Review deleted successfully",
  });
});


exports.GetUserReviews = catchAsync(async (req, res, next) => {
  const userId = req.user._id

  if (!(await User.findById(userId))) {
    return next(new AppError("User not found", 404));
  }

  const reviews = await Review.find({ user: userId }).populate({
    path: "tour",
  });

  if (!reviews) {
    return next(new AppError("No reviews found for this user", 404));
  }

  res.status(200).json({
    status: "success",
    length: reviews.length,
    data: reviews,
  });
});