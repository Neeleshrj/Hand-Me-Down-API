const express = require("express");
const { UserModel } = require("../models/users");
const mongoose = require("mongoose");
const verification = require("../middleware/verification");

const router = express.Router();

router.get("/getStats/:id", verification, async(req,res) => {

    let user = await UserModel.findById(req.params.id);
    console.log(user);
    const tasksPosted = user.tasksPosted.length;
    const tasksAccepted = user.tasksAccepted.length;
    const totalIncome = user.totalIncome;
    res.json({
        tasksPosted: tasksPosted,
        tasksAccepted: tasksAccepted,
        totalIncome: totalIncome
    }).send();
})

module.exports = router;