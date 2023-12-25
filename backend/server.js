const express = require("express");
const server = express();
const cors = require("cors");

server.use(cors());

server.use("/hello", (req, res) => {
  res.send("Hello!");
});

server.listen(8000, () => {
  console.log("Server running on port 8000...");
});
