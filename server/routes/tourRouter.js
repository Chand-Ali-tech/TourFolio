const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tourController");
const reviewRouter = require("./reviewRouter");
const authController = require("../controllers/authController");
const { upload, compressImage } = require("../utils/multer");

router.use("/:tourid/review", reviewRouter); //Redirecting to reviewRouter

router
  .route("/")
  .post(
    authController.Protect,
    authController.RestrictTo("admin"),
    upload.fields([
      { name: "imageCover", maxCount: 1 },
      { name: "images", maxCount: 3 },
    ]),
    compressImage,
    tourController.AddTour
  )
  .get(tourController.GetAllTours);

router
  .route("/top-5-tours")
  .get(tourController.AliasTopFive, tourController.GetAllTours);

router.route("/tour-stats").get(tourController.GetTourSTATS);

router.post('/addToFavorites', authController.Protect, tourController.AddTourToFavorites)
router.delete('/removeFromFavorites/:tourId', authController.Protect, tourController.RemoveTourFromFavorites)

router
  .route("/:id")
  .get(tourController.GettourByID)
  .patch(
    authController.Protect,
    authController.RestrictTo("admin", "lead-guides"),
    tourController.UpdateTour
  )
  .delete(
    authController.Protect,
    authController.RestrictTo("admin"),
    tourController.DeleteTour
  );

module.exports = router;
