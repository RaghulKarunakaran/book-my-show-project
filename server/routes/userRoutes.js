const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      res.send({
        success: false,
        message: "User already exists"
      });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = await User(req.body);
    await newUser.save();
  
    res.send({
      success: true,
      message: "user created successfully"
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: err
    })
  }
})

router.post('/login', async (req, res) => {
    console.log('login');
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.send({
          success: false,
          message: "User does not exist"
        })
      }
  
      const validPassword = await bcrypt.compare(req.body.password, user.password);
  
      if (!validPassword) {
        res.send({
          success: false,
          message: "Invalid password"
        })
        return;
      }
  
      const token = jwt.sign({ userId: user._id }, "Scaler_BMS" , {
        expiresIn: "1d",
      });
  
      res.send({
        success: true,
        message: "Logged in",
        token: token
      });
  
  
    } catch (err) {
      console.log(err);
    }
})

module.exports = router;