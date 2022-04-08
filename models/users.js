const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("dotenv").config("./env");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    phoneNumber: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10,
    },
    publicKey: {
        type: String,
        required: true,
    },
    tasksPosted: {
        type: [Schema.Types.ObjectId],
        ref: 'tasks',
    },
    tasksAccepted: {
        type: [Schema.Types.ObjectId],
        ref: 'tasks',
    },
    transanctionHistory: {
        type: String,
    }
});

userSchema.methods.generateAuthToken = function () {
    console.log(process.env.jwtPrivateKey);
    return jwt.sign( { _id: this._id}, process.env.jwtPrivateKey);
}

const UserModel =  mongoose.model('User', userSchema);

exports.UserModel = UserModel;