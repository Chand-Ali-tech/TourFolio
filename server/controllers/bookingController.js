const catchAsync = require("../utils/catchAsync");
const appError = require('../utils/appError')
const Tour = require('./../models/tourModel')
const Booking = require('../models/bookingModel')

exports.GetBooking = catchAsync(async (req, res, next) => {
    const user = req.user._id;

    const tour = await Tour.findById(req.params.tourId)
    if (!tour) {
        return next(new appError("Tour not found", 404))
    }

    const booking = await Booking.create({
        tour: req.params.tourId,
        user: user,
        price: tour.price,
        paymentStatus: 'paid'
    })

    res.status(201).json({
        status: "success",
        data: booking,
    })
})

exports.GetAllBookingsOfUser = catchAsync(async (req, res, next) => {
    const bookings = await Booking.find({ user: req.user._id }).populate('tour')

    if (!bookings) {
        return next(new appError("No bookings found", 404))
    }

    res.status(200).json({
        status: "success",
        data: bookings
    })

})