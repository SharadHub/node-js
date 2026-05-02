const Task = require("../model/Tasks");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching tasks",
    });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Task ID format is not found",
    });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, isCompleted, priority } = req.body;
    if (!title || !priority) {
      return res.status(400).json({
        success: false,
        message: "Title and priority are mandatory",
      });
    }

    const newTask = await Task.create({
      title,
      description,
      isCompleted: isCompleted ?? false,
      priority,
    });

    res.status(201).json({
      success: true,
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid id format or update error",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid id format or delete error",
    });
  }
};


module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};