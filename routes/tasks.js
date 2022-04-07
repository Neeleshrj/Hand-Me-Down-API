const express = require('express');
const { TaskModel } = require('../models/tasks');
const mongoose = require('mongoose');
const { validate } =  require('../models/helper/taskValidate');

const router = express.Router();

router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if(error)  return res.status(400).json({
        error: error.details[0].message
    }).send()
})