const User = require("../models/user");
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    // Verify the JWT token
    const { _id, password } = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(_id, password)

    // Check if the user exists and has a matching password
    const user = await User.findById(_id).select("password");
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Attach the id to the request params
    req.params.id = _id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    // Verify the JWT token
    const { _id, password } = jwt.verify(token, process.env.SECRET_KEY);

    // Check if the user exists and has a matching password
    const user = await User.findById(_id).select("password isAdmin");

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Check if the user is an admin
    if (user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ error: "Forbidden: Admin access required" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = {
  verifyUser,
  verifyAdmin,
};
