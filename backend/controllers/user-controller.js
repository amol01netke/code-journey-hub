const process = require("process");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require(`../models/user.js`);

const loginUser = async (req, res) => {
  try {
    //get all inputs
    const { email, password } = req.body;

    //if empty fields
    if (!email || !password)
      return res.status(204).json({ message: "Please fill in all fields." });

    //if user not registered
    const user = await User.findOne({ email });

    if (!user)
      return res.status(201).json({ message: "Email is not registered!" });

    //check password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res.status(401).json({ message: "Invalid password!" });

    //if valid password, create a token

    //Note :
    //here we assign userId to mongodb's user._id of user document in the payload
    //this userId is extracted further to access specific user information
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_KEY || "cjhwebsite",
      {
        expiresIn: "1h",
      }
    );

    //return token and store locally
    res.status(200).json({ message: "User logged in successfully!", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    //get all inputs
    const { firstName, lastName, email, password } = req.body;

    //if empty fields
    if (!firstName || !lastName || !email || !password)
      return res.status(204).json({ message: "Please fill in all fields." });

    //if email already registered
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "Email is already registered!" });

    //else create new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    //Note :
    //here we assign userId to mongodb's user._id of user document in the payload
    //this userId is extracted further to access specific user information
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_KEY || "cjhwebsite",
      {
        expiresIn: "1h",
      }
    );

    //return token and store locally
    res.status(201).json({ message: "User registered successfully!", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = await jwt.verify(
      token,
      process.env.JWT_KEY || "cjhwebsite"
    );

    const userId = decodedToken.userId;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = loginUser;
exports.registerUser = registerUser;
exports.getUserDetails = getUserDetails;
