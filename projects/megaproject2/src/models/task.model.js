import mongoose from "mongoose";
import { Schema } from "mongoose";
import { AvailableTaskStatuses, TaskStatusEnum } from "../utils/constants";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedto: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedby: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: TaskStatusEnum,
      default: AvailableTaskStatuses.TO_DO,
    },
    attachments: {
      type: [
        {
          url: String,
          mimetype: String, //.jpg , .png etc
          size: Number,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Tasks", taskSchema);

export default Task;
