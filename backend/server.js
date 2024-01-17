const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userController = require("./controllers/user-controller");

//middleware
server.use(cors());
server.use(express.json());

//routes

//get
server.get("/api/get-user-profile", userController.getUserProfile);
server.get(
  "/api/get-user-profile-by-username/:username",
  userController.getUserProfileByUsername
);

//post
server.post("/api/login", userController.loginUser);
server.post("/api/register", userController.registerUser);
server.post("api/create-profile-url", userController.createProfileURL);
server.post(
  "/api/create-codechef-profile",
  userController.createCodechefProfile
);
server.post(
  "/api/create-leetcode-profile",
  userController.createLeetcodeProfile
);

//update
server.put("/api/update-user-profile", userController.updateUserProfile);

//delete
server.delete(
  "/api/delete-codechef-profile",
  userController.deleteCodechefProfile
);
server.delete(
  "/api/delete-leetcode-profile",
  userController.deleteLeetcodeProfile
);

//connect with database and start the server
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qlczpkc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log(`MongoDB connection established!`);
    server.listen(8000, () => {
      console.log(`Server is running on port 8000...`);
    });
  })
  .catch((error) => {
    console.log(`MongoDB connection failed!`);
    console.log(error.message);
  });
