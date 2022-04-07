const express = require('express');
const {UserModel} = require('../models/users');
const _ = require('lodash');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validate } = require('../models/helper/userValidate');

const router = express.Router();

router.post('/',async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).json({
        error: error.details[0].message
    }).send();

    let user = await UserModel.findOne({phoneNumber: req.body.phoneNumber})
    if(user) return res.status(400).json(
        {
            error: 'Phone Number already registered!'
        }
    ).send();

    user = new UserModel(
        _.pick(req.body, ['phoneNumber', 'fullname', 'email','password', 'publicKey'])
    );

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    res.json({
        status: '200'
    }).send();
})

module.exports =  router;