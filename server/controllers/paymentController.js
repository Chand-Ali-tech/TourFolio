const stripe = require("stripe")(
  "sk_test_51Qq8p1SGSsaBD7BXvRzdDP830rTFxMfkdp2JyxIkmpzXcMUzFgbcYSjlpxINEZ3OW5XiENRi5ZCgfwKMSikjd7q200SSUphTiT"
);
const catchAsync = require("../utils/catchAsync");

exports.HandlePayments = catchAsync(async (req, res, next) => {
  const { amount, paymentMethodId } = req.body;

  // console.log("User: ", req.user);

  if (!amount || !paymentMethodId) {
    return res.status(400).json({
      success: false,
      message: "Missing amount or payment method ID.",
    });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "pkr",
    payment_method: paymentMethodId,
    confirm: true, // Auto-confirm payment
    receipt_email: req.user.email, // Send email receipt to user
    metadata: {
      customer_name: req.user.name, // Store name in Stripe metadata
      email: req.user.email, // Store email in metadata
    },
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "never",
    },
  });

  next()

});