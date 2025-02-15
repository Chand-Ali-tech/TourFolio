const express = require("express");
const router = express.Router({ mergeParams: true }); //This is to get the tourId from the tourRouter.Redirecting from tourRouter.
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

// /api/tour/:tourid/review/ and then below :-

router
  .route("/")
  .post(
    authController.Protect,
    authController.RestrictTo("user"),
    reviewController.AddReview
  )
  .get(reviewController.GetAllReviews);


router
  .route("/:id")
  .delete(
    authController.Protect,
    authController.RestrictTo("user", "admin"),
    reviewController.DeleteReview
  );





module.exports = router;
