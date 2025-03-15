import mongoose, { model, Schema } from "mongoose";
import { ProjectInterface, ProjectStatus } from "./project.interface";

export const ProjectSchema = new Schema<ProjectInterface>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    key: { type: String, required: true, unique: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    issues: [{ type: Schema.Types.ObjectId, ref: "Issue" }],
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      required: true,
    },
  },
  { timestamps: true }
);
