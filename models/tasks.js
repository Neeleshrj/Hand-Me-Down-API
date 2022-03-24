const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

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
    postUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    acceptUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    payout: {
        type: Number,
        required: true,
    },
})

const TaskModel =  mongoose.model('Tasks', taskSchema);

exports.TaskModel = TaskModel;