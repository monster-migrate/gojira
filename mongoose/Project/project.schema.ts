import mongoose, { model, Schema } from "mongoose";
import { ProjectInterface, ProjectStatus } from "./project.interface";

export const ProjectSchema = new Schema<ProjectInterface>(
  {
    name: { 
      type: String, 
      required: true,
      index: 'text' 
    },
    description: { 
      type: String, 
      required: false  // Matches GraphQL's optional String type
    },
    key: { 
      type: String, 
      required: true, 
      unique: true,
      uppercase: true,
      match: /^[A-Z]{2,5}$/  // Example: 2-5 uppercase letters
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[a-z0-9-]+$/  // URL-friendly format
    },
    endDate: Date,
    owner: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
      index: true 
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: "ProjectUser"  // Reference to ProjectUser collection
    }],
    issues: [{ 
      type: Schema.Types.ObjectId, 
      ref: "Issue" 
    }],
    sprints: [{
      type: Schema.Types.ObjectId,
      ref: "Sprint"
    }],
    backlog: [{
      type: Schema.Types.ObjectId,
      ref: "Issue"
    }],
    boards: [{
      type: Schema.Types.ObjectId,
      ref: "Board"
    }],
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.ACTIVE,
      index: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { 
    timestamps: true  // Auto-adds createdAt and updatedAt
  }
);

// Compound indexes for common query patterns
ProjectSchema.index({ 
  owner: 1, 
  status: 1 
});

ProjectSchema.index({
  key: 1,
  slug: 1
}, { unique: true });
