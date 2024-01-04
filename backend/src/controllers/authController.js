const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ error: "User already exists" });
    }

    delete req.body.isAdmin;

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);
    req.body.password = hashedPassword;

    // Create the user
    const user = await User.create(req.body);

    // Include JWT key and send response
    res.status(201).json(includeKey(user));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare passwords using bcrypt.compare
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (isPasswordValid) {
      // Include JWT key and send response
      res.status(200).json(includeKey(user));
    } else {
      res.status(404).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const includeKey = (user) => {
  // Include JWT key in the user object
  user = { ...user }._doc;
  user.key = jwt.sign(
    { _id: user._id, password: user.password },
    process.env.SECRET_KEY
  );

  // Remove sensitive information
  delete user.password;
  return user;
};

module.exports = {
  createUser,
  loginUser,
};
