require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());
app.use(cors());

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

console.log("Connectiong to database with", dbUser, dbPass);
// 🔗 Connect MongoDB
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@cluster0.xcot0za.mongodb.net/?appName=Cluster0`,
  )

  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error", err));

// 🧱 User Schema
const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  phone: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// 🟢 SIGNUP ROUTE
app.post("/signup", async (req, res) => {
  try {
    const { fullname, email, phone, password, confirmPassword } = req.body;

    //check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      phone,
      password: hashedPassword,
    });
    await newUser.save();

    res.json({ message: "Signup Succesfull" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

// 🔵 LOGIN ROUTE
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    res.json({ message: "Login sucessfull" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
