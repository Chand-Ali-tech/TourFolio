const Tour = require("../models/tourModel");
const User = require("../models/userModel");
const APIFeatures = require("../utils/apiFeatures");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { uploadOnCloudinary } = require("../utils/cloudinary");

// Add a new tour
exports.AddTour = catchAsync(async (req, res, next) => {
  const { files } = req;

  if (!files || !files.imageCover || !files.images) {
    return next(new AppError("Please provide the required images!", 400));
  }

  // Upload the cover image
  const imageCoverUrl = await uploadOnCloudinary(
    files.imageCover[0].buffer,
    `cover-${Date.now()}`
  );

  // Upload other images
  const imagesUrls = await Promise.all(
    files.images.map((file, index) =>
      uploadOnCloudinary(file.buffer, `image-${Date.now()}-${index}`)
    )
  );
  
  // Create a new tour
  const newTour = await Tour.create({
    ...req.body,
    imageCover: imageCoverUrl,
    images: imagesUrls,
  });

  // Send response
  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
});

exports.AliasTopFive = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-averageRating,price';
  next();
}

exports.GetAllTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .Fields()
    .Pagination();

  const tours = await features.query; //features.query conatins all desired tours.
  const Totaltours = await Tour.find();

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
      Totaltours: Totaltours.length
    },
  });
});

exports.GettourByID = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate({
    path: "guides", //Give all inforTION OF REFERNCED user.
    select: "-__v", // Do not show in postman
  });

  if (!tour) {
    return next(new AppError("No tour found.", 404)); // Using next with error
  }

  res.status(200).json({
    status: "Success",
    data: tour,
  });
});

exports.UpdateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true, //All validators must run again to confirm as was case in insert(Add)
  });

  res.status(200).json({
    status: "success",
    data: tour,
  });
});

// exports.DeleteTour = factory.DeleteOne(Tour)
exports.DeleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return next(new AppError("Tour not found", 404));
  }
  res.status(200).send(`Tour with id ${req.params.id} is deleted.`);
});

//Aggregation pipeline. (Matching and Grouping)
exports.GetTourSTATS = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { averageRating: { $gte: 4 } }, //Only include these tours which have AverageRating of > 4
    },
    {
      $group: {
        _id: "$difficulty",    // Group by NULL,Difficulty
        numTours: { $sum: 1 }, // No of total tours
        numRating: { $sum: "$ratingQuantity" }, // Total number of ratings given by users
        avgRating: { $avg: "$averageRating" }, // Average rating of all tours
        avgPrice: { $avg: "$price" }, // Average price of all tours
        minPrice: { $min: "$price" }, // Min price of a a tour
        maxPrice: { $max: "$price" }, // Max price of a tour
      },
    },
    {
      $sort: { avgPrice: 1 },
    }
  ]);

  res.status(200).json({
    status: "Success",
    data: stats,
  });
});

exports.AddTourToFavorites = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.body.tourId);

  if (!tour) {
    return next(new AppError("Tour not found", 404));
  }

  // Check if the tour is already in the user's favorites
  if (req.user.favouriteTours.some(favTour => favTour._id.toString() === tour._id.toString())) {
    return next(new AppError("Tour already in favorites", 409));
  }

  // Add the tour to the user's favorites
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { favouriteTours: req.body.tourId } },
    { new: true } // Ensure it returns the updated user
  ).populate('favouriteTours')

  res.status(200).json({
    status: "success",
    message: "Tour added to favorites",
    user, // Return updated user if needed
  });
});

exports.RemoveTourFromFavorites = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);

  if (!tour) {
    return next(new AppError("Tour not found", 404));
  }

  // Check if the tour is actually in the user's favorites before attempting to remove it
  const isTourInFavorites = req.user.favouriteTours.some(
    (favTour) => favTour._id.toString() === tour._id.toString()
  );

  if (!isTourInFavorites) {
    return next(new AppError("Tour is not in favorites", 409));
  }

  // Remove the tour from the user's favorites using $pull
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { favouriteTours: tour._id } }, // Corrected update query
    { new: true } // Ensure it returns the updated user
  ).populate('favouriteTours');

  res.status(200).json({
    status: "success",
    message: "Tour removed from favorites",
    user, 
  });
});