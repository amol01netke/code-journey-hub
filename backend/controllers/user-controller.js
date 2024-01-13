const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require(`../models/user.js`);

const createToken = (id) => {
  return jwt.sign({ userId: id }, process.env.JWT_KEY || "cjhwebsite", {
    expiresIn: "1h",
  });
};

const decodeToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_KEY || "cjhwebsite", {
    expiresIn: "1h",
  });

  return decodedToken.userId;
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email and password." });
    }

    const user = await User.findOne({ email });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password." });
      }

      const token = createToken(user._id);

      res.status(200).json({ message: "User logged in successfully!", token });
    } else {
      return res.status(404).json({ error: "Email is not registered." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Please fill in all fields." });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      const token = createToken(user._id);

      res.status(201).json({ message: "User registered successfully!", token });
    } else {
      return res.status(400).json({ error: "Email is already registered." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const createCodechefProfile = async (req, res) => {
  try {
    //fetch data from codechef api
    const { username } = req.body;
    const response = await fetch(`https://codechef-api.vercel.app/${username}`);

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const token = req.headers.authorization.split(" ")[1];
      const userId = decodeToken(token);
      const user = await User.findOne({ _id: userId });

      if (user) {
        const { globalRank, stars, currentRating, highestRating } = data;
        user.codechef = {
          username,
          globalRank,
          stars,
          currentRating,
          highestRating,
        };

        await user.save();

        res
          .status(200)
          .json({ message: "Codechef profile created successfully!", user });
      } else {
        res.status(404).json({ error: "User not found." });
      }
    } else {
      res.status(500).json({ error: "Failed to fetch CodeChef data." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const createLeetcodeProfile = async (req, res) => {
  try {
    //fetch data from leetcode api
    const { username } = req.body;
    const response = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${username}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const token = req.headers.authorization.split(" ")[1];
      const userId = decodeToken(token);
      const user = await User.findOne({ _id: userId });

      if (user) {
        const {
          ranking,
          contributionPoints,
          acceptanceRate,
          totalSolved,
          totalQuestions,
        } = data;

        user.leetcode = {
          username,
          ranking,
          contributionPoints,
          acceptanceRate,
          totalSolved,
          totalQuestions,
        };

        await user.save();

        res
          .status(200)
          .json({ message: "Leetcode profile created successfully!", user });
      } else {
        res.status(404).json({ error: "User not found." });
      }
    } else {
      res.status(500).json({ error: "Failed to fetch Leetcode data." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const userId = decodeToken(token);

    const user = await User.findOne({ _id: userId });

    if (user) {
      res.status(200).json(user);
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const userId = decodeToken(token);

    const user = await User.findOne({ _id: userId });

    if (user) {
      const formData = req.body;

      user.firstName = formData.firstName;
      user.lastName = formData.lastName;

      await user.save();

      res.json({ message: "Profile updated successfully!", user });
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

exports.loginUser = loginUser;
exports.registerUser = registerUser;

exports.createCodechefProfile = createCodechefProfile;
exports.createLeetcodeProfile = createLeetcodeProfile;

exports.getUserProfile = getUserProfile;
exports.updateUserProfile = updateUserProfile;
