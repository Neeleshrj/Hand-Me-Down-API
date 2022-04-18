const express = require("express");
const { TaskModel } = require("../models/tasks");
const { UserModel } = require("../models/users");
const mongoose = require("mongoose");
const _ = require("lodash");
const { validate } = require("../models/helper/taskValidate");
const verification = require("../middleware/verification");

const router = express.Router();

router.post("/:id", verification, async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .json({
        error: error.details[0].message,
      })
      .send();

  let task = new TaskModel({
    taskTitle: req.body.taskTitle,
    description: req.body.description,
    postUser: req.params.id,
    payout: req.body.payout,
    image: req.body.image,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    completed: false,
  });

  let user = await UserModel.findById(req.params.id);

  await task.save(async (err, res) => {
    user.tasksPosted.push(res.id);
    await user.save();
  });
  res
    .json({
      status: "200",
      message: "Task Added!",
    })
    .send();
});

router.get("/all/:id", verification, async (req, res) => {
  let taskList = await TaskModel.find({
    acceptUser: null,
    postUser: { $ne: req.params.id },
    completed: false,
  });
  if (!taskList) return res.status(400).send("No Tasks!");
  return res.send(taskList);
});

router.put("/accept/:id/:userId", verification, async (req, res) => {
  let task = await TaskModel.findOne({ _id: req.params.id });
  if (!task) return res.status(400).send("Task does not exist!");

  task.acceptUser = req.params.userId;

  let user = await UserModel.findById(req.params.userId);

  await task.save(async (err, res) => {
    user.tasksAccepted.push(res.id);
    await user.save();
  });
  res
    .json({
      status: "200",
      message: "Task Accepted",
    })
    .send();
});

router.put("/forfeit/:id", verification, async (req, res) => {
  let task = await TaskModel.findOne({ _id: req.params.id });
  if (!task) return res.status(400).send("Task does not exist!");

  task.acceptUser = null;
  await task.save();

  res
    .json({
      status: "200",
      message: "Task Forfeited",
    })
    .send();
});

router.delete("/delete/:id", verification, async (req, res) => {
  TaskModel.findByIdAndRemove({ _id: req.params.id })
    .then(() => {
      res
        .json({
          message: "Task Deleted",
        })
        .send();
    })
    .catch((error) => console.log(error));
});

router.put("/completed/:id/:usedId", verification, async (req, res) => {
  try {
    let task = await TaskModel.findById(req.params.id);
    if (!task) return res.status(400).send("Task does not exist!");

    task.completed = true;

    await UserModel.findOneAndUpdate(req.params.usedId,{$inc: {tasksCompleted: 1}});

    await task.save();

    res
      .json({
        status: "200",
        message: "Task Marked Completed",
      })
      .send();
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
