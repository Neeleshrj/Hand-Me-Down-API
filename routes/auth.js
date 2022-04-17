const express = require("express");
const { UserModel } = require("../models/users");
const _ = require("lodash");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config("./env");
const { validate } = require("../models/helper/userValidate");
const { validateLogin } = require("../models/helper/loginValidate");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .json({
        error: error.details[0].message,
      })
      .send();

  let user = await UserModel.findOne({ phoneNumber: req.body.phoneNumber });
  if (user)
    return res
      .status(400)
      .json({
        error: "Phone Number already registered!",
      })
      .send();

  user = new UserModel(
    _.pick(req.body, [
      "phoneNumber",
      "fullname",
      "email",
      "password",
      "publicKey",
    ])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res
    .json({
      status: "200",
    })
    .send();
});

router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error)
    return res
      .status(400)
      .json({
        error: error.details[0].message,
      })
      .send();

  let user = await UserModel.findOne({ phoneNumber: req.body.phoneNumber });
  if (!user)
    return res
      .status(400)
      .json({
        error: "Invalid phone number or password!",
      })
      .send();

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res
      .status(400)
      .json({
        error: "Invalid phone number or password!",
      })
      .send();

  const token = user.generateAuthToken();
  res
    .json({
      user_id: user._id,
      status: 200,
      authToken: token,
    })
    .send();
});

router.post("/verifyToken", async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.jwtPrivateKey);
    res.status(200).json({
        message: "Valid Token",
        token: decoded
    }).send()
  } catch (ex) {
    res
      .status(400)
      .json({
        status: 400,
        error: "Invalid token",
      })
      .send();
  }
});

module.exports = router;