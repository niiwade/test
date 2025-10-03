"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Todo_1 = require("../models/Todo");
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    try {
        const { title, priority = Todo_1.Priority.MEDIUM, status = Todo_1.Status.PENDING } = req.body;
        if (!title || title.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Title is required'
            });
        }
        const todo = new Todo_1.Todo({
            title: title.trim(),
            priority,
            status
        });
        const savedTodo = await todo.save();
        return res.status(201).json({
            success: true,
            message: 'Todo created successfully',
            data: savedTodo
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error creating todo',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid todo ID format'
            });
        }
        const deletedTodo = await Todo_1.Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Todo deleted successfully',
            data: deletedTodo
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting todo',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
router.get('/', async (req, res) => {
    try {
        console.log("res: ", res);
        const { priority, status, page: pageParam, limit: limitParam } = req.query;
        const page = parseInt(pageParam) || 1;
        const limit = parseInt(limitParam) || 10;
        const skip = (page - 1) * limit;
        console.log({ page, limit, skip });
        const query = {};
        if (priority)
            query['priority'] = priority;
        if (status)
            query['status'] = status;
        const [count, todos] = await Promise.all([
            Todo_1.Todo.countDocuments(query),
            Todo_1.Todo.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
        ]);
        return res.status(200).json({
            success: true,
            message: 'Todos fetched successfully',
            data: todos,
            pagination: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit)
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching todos',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=todos.js.map