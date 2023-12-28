const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userControllers = require("./controllers/user-controllers");

server.use(cors());
server.use(express.json());

server.post("/api/register", userControllers.registerUser);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qlczpkc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    server.listen(8000, () => {
      console.log(`Server is running on port 8000...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
