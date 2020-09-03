const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/sign-up", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.send({
      user,
      token,
    });
  } catch (error) {
    res.status(400).send({
      error: "Sign Up Fail",
    });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Login Error",
    });
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send({
      message: "Logout Successfully",
    });
  } catch (e) {
    res.status(401).json({
      error: e,
    });
  }
});

module.exports = router;
