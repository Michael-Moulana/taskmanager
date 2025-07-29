const { get } = require("mongoose");
const Task = require("../models/Task");
const user1
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

const addTask = async (req, res) => {
  const { title, description, deadline } = req.body;
  try {
    const task = new Task({
      title,
      description,
      deadline,
      userId: req.user._id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error adding task", error });
  }
};

const updateTask = async (req, res) => {
  const { title, description, completed, deadline } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed || task.completed;
    task.deadline = deadline || task.deadline;

    const updateTask = await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.remove();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
