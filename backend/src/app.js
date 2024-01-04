const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/admin/users", adminRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
