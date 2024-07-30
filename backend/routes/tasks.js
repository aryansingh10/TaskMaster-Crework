const express = require('express');
const Task = require('../models/Task');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', isAuthenticated, async (req, res) => {
    try {
        const newTask = new Task({ ...req.body, userId: req.user._id });
        const task = await newTask.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete(
            { _id: req.params.id, userId: req.user._id }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
