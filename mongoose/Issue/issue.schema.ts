import mongoose, { model, Schema } from "mongoose";
import {
  IssueInterface,
  IssueStatus,
  IssuePriority,
  IssueType,
} from "./issue.interface";

export const IssueSchema = new Schema<IssueInterface>(
  {
    issueId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: Object.values(IssueStatus), required: true },
    priority: {
      type: String,
      enum: Object.values(IssuePriority),
      required: true,
    },
    type: { type: String, enum: Object.values(IssueType), required: true },
    reporter: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },
    project_key: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);
