const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userController = require("./controllers/user-controller");

//middleware
server.use(cors());
server.use(express.json());

//routes
server.post("/api/register", userController.registerUser);
server.post("/api/login", userController.loginUser);
server.get("/api/users/user-details", userController.getUserDetails);

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
