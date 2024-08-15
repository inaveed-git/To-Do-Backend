import Task from '../models/task.js'; // Import the Task model

// Controller to create a new task
export const newTask = async (req, res, next) => {
    const { title, description } = req.body;

    // Create a new task and associate it with the authenticated user
    const task = await Task.create({
        title,
        description,
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        message: "Task created successfully",
        task,
    });
};

// Controller to get tasks associated with the authenticated user
export const getTask = async (req, res, next) => {
    const tasks = await Task.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        tasks,
    });
};

// Controller to update a task by its ID
export const updateTask = async (req, res, next) => {
    const { id } = req.params;

    let task = await Task.findById(id);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found",
        });
    }

    // Update the task details
    task = await Task.findByIdAndUpdate(id, req.body, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
    });

    res.status(200).json({
        success: true,
        message: "Task updated successfully",
        task,
    });
};

// Controller to delete a task by its ID
export const deleteTask = async (req, res, next) => {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found",
        });
    }

    // Delete the task
    await task.remove();

    res.status(200).json({
        success: true,
        message: "Task deleted successfully",
    });
};
