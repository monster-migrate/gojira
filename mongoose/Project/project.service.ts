import Project from "./project.model";
import { ProjectInterface } from "./project.interface";
import { ObjectId, Types } from "mongoose";
import { NotFoundError, ConflictError } from "../errors";


export class ProjectService {
  // Create with validation and duplicate key handling
  static async createProject(data: Omit<ProjectInterface, "_id" | "createdAt" | "updatedAt">) {
    try {
      return await Project.create({
        ...data,
        key: data.key.toUpperCase(), // Enforce uppercase keys
        slug: this.generateSlug(data.name),
      });
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictError("Project key or slug already exists");
      }
      throw new Error(`Project creation failed: ${error.message}`);
    }
  }

  static async getProjectById(projectId: ObjectId) {
    const project = await Project.findOne({ _id: projectId }).populate({
      path: "owner",
      select: "email"
    })

    if (!project) throw new NotFoundError("Project not found");
    return project;
  }
  // Get with proper population and caching
  static async getProjectByKey(key: string) {
    const project = await Project.findOne({ key: key.toUpperCase() })
      .populate({
        path: "owner",
        select: "name email role",
      })
      .populate({
        path: "members",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .populate({
        path: "issues",
        select: "key title status",
      })
      .lean()
      .cacheQuery();

    if (!project) throw new NotFoundError("Project not found");
    return project;
  }
  static async getProjectsByUserID(userId: ObjectId) {
    const projects = await Project.find({ owner: userId }).populate({
      path: "owner",
      select: "name email role"
    })
    return projects;
  }

  // Paginated list with filtering
  static async getAllProjects(page = 1, limit = 10, filter = {}) {
    const skip = (page - 1) * limit;

    return Project.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("owner", "name email")
      .lean();
  }

  // Safe update with validation
  static async updateProject(key: string, data: Partial<ProjectInterface>) {
    const project = await Project.findOne({ key: key.toUpperCase() });
    if (!project) throw new NotFoundError("Project not found");

    const updatableFields: (keyof ProjectInterface)[] = [
      "name",
      "description",
      "status",
      "endDate"
    ];
    const updates = Object.keys(data)
      .filter((key): key is keyof ProjectInterface =>
        updatableFields.includes(key as keyof ProjectInterface)
      )
      .reduce((obj: Partial<ProjectInterface>, key) => {
        const value = data[key];
        if (value !== undefined) {
          (obj as any)[key] = value;
        }
        return obj;
      }, {});
    Object.assign(project, updates);
    await project.save();
    return project.toObject();
  }

  // Soft delete implementation
  static async deleteProject(key: string) {
    const result = await Project.findOneAndUpdate(
      { key: key.toUpperCase() },
      { isDeleted: true, status: "ARCHIVED" },
      { new: true }
    );

    if (!result) throw new NotFoundError("Project not found");
    return true;
  }

  private static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
