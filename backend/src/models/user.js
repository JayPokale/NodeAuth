const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => /^[a-zA-Z\s]+$/.test(value),
        error: "Name must contain only alphabets",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
        error: "Email must be alphanumeric",
      },
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
    },
    phone: {
      type: String,
      validate: {
        validator: (value) => /^\+?\d+$/.test(value),
        error: "Phone must contain only numbers",
      },
    },
    gender: {
      type: String,
    },
    howDidYouHear: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
