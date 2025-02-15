const express = require("express")
const router = express.Router()
const paymentController = require("../controllers/paymentController")
const bookingController = require("../controllers/bookingController")
const authController = require("../controllers/authController")

router.get('/userBookings', authController.Protect, bookingController.GetAllBookingsOfUser)
router.post("/tour/:tourId", authController.Protect, paymentController.HandlePayments, bookingController.GetBooking)


module.exports = router;