const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const reviewController = require("../controllers/reviewController");

// Authentication routes
router.route("/signup").post(authController.Signup);
router.route("/signup/verify-email").post(authController.VerifyAndRegister);
router.route("/login").post(authController.Login); // Ensure this comes before parameterized routes
router.route("/logout").get(authController.Protect, authController.Logout);

// User routes
router.route("/").get(authController.Protect, userController.GetAllUsers);
router.patch(
  "/updateMe",
  authController.Protect,
  userController.UpdatePhoto,
  userController.EditUserPhoto,
  userController.UpdateMe
);

router.get("/me", authController.Protect, userController.GetMe);
router.delete("/deleteMe", authController.Protect, userController.DeleteAccount);
router.delete(
  "/deleteAccount/:id",
  authController.Protect,
  authController.RestrictTo("admin"),
  userController.DeleteAccount
);

// Reviews route
router.get('/reviews', authController.Protect, reviewController.GetUserReviews);

// Check authentication route
router.route('/check-auth').get(authController.Protect, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "User is authenticated",
    data: {
      user: req.user
    }
  });
});

// Parameterized routes (must come after static routes)
router.route("/:id").get(userController.GetUserById);

module.exports = router;