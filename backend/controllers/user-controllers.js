const User = require(`../models/user.js`);

const registerUser = async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  } catch (err) {
    console.log(err);
  }
};

const loginUser = () => {};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
