const mongoose = require("mongoose");
const Validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name."],
  },
  email: {
    type: String,
    required: [true, "Please enter email."],
    unique: true,
    validate: [Validator.isEmail, "Please enter a valid email!"],
  },
  photo: {
    type: String,
    default: "https://res.cloudinary.com/dy6ixoi99/image/upload/v1738772848/default_ywurmd.png",
  },
  role: {
    type: String,
    enum: ["user", "lead-guide", "guide", "admin"],
    default: "user",
    select: false
  },
  favouriteTours: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Tour",
    default: [],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    select: false,
    validate: {
      validator: function (value) {
        // Regular expression to check for at least one alphabet, one number, and one symbol
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        );
      },
      message:
        "Password must contain at least one alphabet, one number, and one symbol, and be at least 8 characters long.",
    },
  },
});

// Password hashing before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Correct password method to compare hashed password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
