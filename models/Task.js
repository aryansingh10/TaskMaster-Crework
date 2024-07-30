const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['To-Do', 'In Progress', 'Under Review', 'Completed'],
        default: 'To-Do',
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'Urgent'],
        default: 'Medium',
    },
    deadline: {
        type: Date
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Task', TaskSchema);
