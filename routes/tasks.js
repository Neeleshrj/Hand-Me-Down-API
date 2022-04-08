const express = require("express");
const { TaskModel } = require("../models/tasks");
const mongoose = require("mongoose");
const _ = require("lodash");
const { validate } = require("../models/helper/taskValidate");
const verification = require('../middleware/verification');

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

  let task = new TaskModel(
    {
      taskTitle: req.body.taskTitle,
      description: req.body.description,
      postUser: req.params.id,
      payout: req.body.payout,
      image: req.body.image,
    }
  );

  console.log(task);

  await task.save();
  res.json({
      status: '200',
      message: 'Task Added!'
  }).send();

});

router.get("/all", async(req, res) => {
    let taskList = await TaskModel
        .find({acceptUser: null})
    if (!taskList) return res.status(400).send('No Tasks!')
    return res.send(taskList);
});

module.exports = router;