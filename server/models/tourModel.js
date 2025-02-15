const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "Length of tour cannot be greater than 40 chars"],
      minlength: [10, "Length of tour cannot be less than 10 chars"],
    },
    duration: {
      type: Number,
      required: [true, "A tour must have duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty can be easy,medium,difficult",
      },
    },
    price: {
      type: Number,
      required: [true, "A tour must have price"],
    },
    averageRating: {
      type: Number,
      default: 4.5,
      min: [1, "Average rating must be greater than or equal to 1."],
      max: [5, "Average rating must be less than or equal to 5."],
      set: (val) => Math.round(val * 10) / 10, // Round off to one decimal place
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have a summary"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: "Discount price({VALUE}) cannot be greater than actual price",
      },
    },
    promoCode: {
      type: String,
      required: [true, "A tour must have a promo code"],
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have an image"],
    },
    images: [String],
    startDates: [Date],
    locations: {
      type: String,
      default: 'Point',
      required: true
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
TourSchema.index({ price: 1, averageRating: -1 });
TourSchema.index({ slug: 1 });

// Virtual field for duration in weeks
TourSchema.virtual("DurationWeek").get(function () {
  return this.duration / 7;
});

const Tour = mongoose.model("Tour", TourSchema);

module.exports = Tour;
