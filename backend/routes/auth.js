const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = require("../middleware/auth");

//@route get api/auth
//@description Check if user is login in
//@Access public
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@router Post register
//@Description Register User
//@aAccess Public
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  //Valid
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username & password" });
  }
  try {
    //Checking exist user
    let user = await User.findOne({ username: username });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exsist" });
    }

    //Allgood
    //Hash password
    const hasedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hasedPassword });
    await newUser.save();

    //Token payback
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACESS_TOKEN_SECRET
    );
    res.json({
      accessToken,
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@Login router
//@Des login user
//@Access public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });

  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    // Username found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    // All good
    // Return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACESS_TOKEN_SECRET
    );

    res.json({
      accessToken,
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
