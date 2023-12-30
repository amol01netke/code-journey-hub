const mongoose = require("mongoose");

// schema is defined here
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "user-data" }
);

// a new user model is created here using schema
const User = mongoose.model("User", userSchema);

// we exported the model
module.exports = User;
