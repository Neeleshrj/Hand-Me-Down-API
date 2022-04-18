const { boolean, required } = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        min: 10,
        max: 2000,
    },
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    postUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    acceptUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    payout: {
        type: Number,
        required: true,
    },
    completed: {
        type: Boolean,
    }
})

const TaskModel =  mongoose.model('Tasks', taskSchema);

exports.TaskModel = TaskModel;