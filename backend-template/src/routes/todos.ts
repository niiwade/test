import express, { Request, Response } from 'express';
import { Todo, Priority, Status } from '../models/Todo';

const router = express.Router();

interface CreateTodoRequest {
  title: string;
  priority?: Priority;
  status?: Status;
}

router.post('/', async (req: Request<{}, {}, CreateTodoRequest>, res: Response) => {
  try {
    const { title, priority = Priority.MEDIUM, status = Status.PENDING } = req.body;

    if (!title || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const todo = new Todo({
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating todo',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid todo ID format'
      });
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);

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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting todo',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});


router.get('/', async (req: Request, res: Response) => {
  try {

    console.log("res: ", res);
    const { priority, status, page: pageParam, limit: limitParam } = req.query as any;
    
    const page = parseInt(pageParam) || 1;
    const limit = parseInt(limitParam) || 10;
    const skip = (page - 1) * limit;

    console.log({ page, limit, skip });

    const query: { priority?: string, status?: string } = {};
    if (priority) query['priority'] = priority;
    if (status) query['status'] = status;

    const [count, todos] = await Promise.all([
      Todo.countDocuments(query),
      Todo.find(query)
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching todos',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});


export default router;