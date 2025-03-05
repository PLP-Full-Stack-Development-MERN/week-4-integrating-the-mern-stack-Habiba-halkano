const express = require("express")
const Task = require('../models/Task');

const router = express.Router()
//create a new task
router.post("/", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

//retrieve all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// update a task by id
router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if (!task) return res.status(404).json({message: "Task not found"});
            res.status(200).json(task)  
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});

// delete a task by id
router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({message: "Task not found"});
        res.status(200).json({message: "Task deleted successfully"})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

module.exports = router