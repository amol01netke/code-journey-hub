const mongoose = require("mongoose");

// schema is defined here
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    codechef: {
      username: { type: String },
      globalRank: { type: String },
      stars: { type: String },
    },
    leetcode: {
      username: { type: String },
      ranking: { type: String },
      contributionPoints: { type: String },
    },
  },

  { collection: "user-data" }
);

// a new user model is created here using schema
const User = mongoose.model("User", userSchema);

// we exported the model
module.exports = User;
