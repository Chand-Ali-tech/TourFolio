const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const TourHandler = require("./routes/tourRouter");
const UserHandler = require("./routes/userRouter");
const AppError = require("./utils/appError");
const ErrorController = require("./controllers/errorController");
const ReviewHandler = require("./routes/reviewRouter");
const PaymentHandler = require('./routes/bookingRouter')

app.use(
  cors({
   origin: "*",
   // origin: ["http://localhost:5173", "https://tourfolio.vercel.app"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    // credentials: true,
    // allowedHeaders: ["Content-Type", "Authorization"] // Allow necessary headers
  })
);


app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "To many requests from same IP.Try again lator!",
  statusCode: 429,
});

// // Body parsor, Limiting the request from the same IP address.
app.use("/api/user/login", limiter);

// Allowing to read data from req.body
app.use(express.json({ limit: "10kb" })); // Allow only 10kb data only to get added in body.

// Cookie parser
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: ["duration", "AverageRating", "Difficulty"],
  })
);

app.use("/api/tour", TourHandler);
app.use("/api/user", UserHandler);
app.use("/api/review", ReviewHandler);
app.use("/api/booking", PaymentHandler)

app.all("*", (req, res, next) => {
  next(new AppError(`Route https:/${req.originalUrl} is not found.`, 404));
});

app.use(ErrorController);

module.exports = app;

// Toast for pop ups
