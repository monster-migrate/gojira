import Project from "./project.model";
import { ProjectInterface } from "./project.interface";

export const createProject = async (data: ProjectInterface) => {
  try {
    return await Project.create(data);
  } catch (error) {
    throw new Error(`Error creating project: ${error}`);
  }
};

export const getProjectByKey = async (key: string) => {
  try {
    return await Project.findOne({ key: key })
      .populate("owner")
      .populate("members")
      .populate("issues");
  } catch (error) {
    throw new Error(`Error fetching project: ${error}`);
  }
};
export const getAllProjects = async () => {
  try {
    return await Project.find({})
      .populate("owner")
      .populate("members")
      .populate("issues");
  } catch (error) {
    throw new Error(`Error fetching projects: ${error}`);
  }
};

export const updateProject = async (
  key: string,
  data: Partial<ProjectInterface>
) => {
  try {
    const project = await Project.findOne({ key });
    if (!project) {
      throw new Error(`Project not found`);
    }
    Object.assign(project, data);
    await project.save();
    return { ...project.toObject(), ...data };
  } catch (error) {
    throw new Error(`Error updating project: ${error}`);
  }
};

export const deleteProject = async ({
  key,
}: {
  key: string;
}): Promise<boolean> => {
  try {
    await Project.deleteOne({ key });
    return true;
  } catch (error) {
    throw new Error(`Error deleting project: ${error}`);
  }
};
