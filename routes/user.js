const express = require("express");
const { UserModel } = require("../models/users");
const { TaskModel } = require("../models/tasks");
const mongoose = require("mongoose");
const verification = require("../middleware/verification");

const router = express.Router();

router.get("/getStats/:id", verification, async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.id);
    const tasksPosted = user.tasksPosted.length;
    const tasksAccepted = user.tasksAccepted.length;
    const totalIncome = user.totalIncome;
    res
      .json({
        name: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        tasksPosted: tasksPosted,
        tasksAccepted: tasksAccepted,
        tasksCompleted: user.tasksCompleted,
        totalIncome: totalIncome,
      })
      .send();
  } catch (e) {
    console.log(e);
  }
});

router.get("/activeJobs/:id", verification, async (req, res) => {
  try {
    let tasks = await TaskModel.find({
      acceptUser: req.params.id,
      completed: false,
    });

    res
      .json({
        status: 200,
        activeJobs: tasks,
      })
      .send();
  } catch (e) {
    console.log(e);
  }
});

router.get("/name/:id", verification, async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.id);
    res
      .json({
        name: user.fullname,
      })
      .send();
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
