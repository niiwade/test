import mongoose, { Document, Schema } from 'mongoose';

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum Status {
  PENDING = 'pending',
  DONE = 'done',
  CANCELLED = 'cancelled'
}

export interface ITodo extends Document {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    priority: {
      type: String,
      enum: Object.values(Priority),
      default: Priority.MEDIUM,
      required: [true, 'Priority is required']
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.PENDING,
      required: [true, 'Status is required']
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

export const Todo = mongoose.model<ITodo>('Todo', TodoSchema);