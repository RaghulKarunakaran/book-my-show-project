const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

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