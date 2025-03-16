import {
  createProject,
  getProjectByKey,
  getAllProjects,
  updateProject,
  deleteProject,
} from "../../mongoose/Project/project.service";
import { getUserByEmail } from "../../mongoose/User/user.services";
import { ProjectStatus } from "../../mongoose/Project/project.interface";
import { v4 as uuidv4 } from "uuid";
import { IssueInterface } from "../../mongoose/Issue/issue.interface";
import { UserRole } from "../../mongoose/User/user.interface";

function createUniqueId() {
  const uniqueId = uuidv4();
  return uniqueId;
}
export const projectResolver = {
  Query: {
    getProject: async (_parent: unknown, { key }: { key: string }) => {
      const project = await getProjectByKey(key);
      if (!project) throw new Error("Project Not Found!");
      return project;
    },
    getProjects: async () => {
      return await getAllProjects();
    },
  },
  Mutation: {
    createProject: async (
      _parent: unknown,
      {
        name,
        description,
        owner,
        status,
      }: {
        name: string;
        description: string;
        owner: {
          name: string;
          email: string;
          password: string;
          role: UserRole;
        };
        status: ProjectStatus;
      }
    ) => {
      try {
        const user = await getUserByEmail(owner.email);
        if (!user) {
          throw new Error("User not found");
        }
        const document = {
          name,
          description,
          owner: user,
          key: createUniqueId(),
          members: [],
          issues: [],
          status,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const success = await createProject(document);
        if (!success) {
          throw new Error("Failed to create project");
        }
        return document;
      } catch (error) {
        console.error(error);
      }
    },
    updateProject: async (
      _parent: unknown,
      {
        key,
        name,
        description,
        status,
        members,
        issues,
      }: {
        key: string;
        name: string;
        description: string;
        status: ProjectStatus;
        members: {
          name: string;
          email: string;
          password: string;
          role: UserRole;
        }[];
        issues: IssueInterface[];
      }
    ) => {
      try {
        const users = [];
        for (const member of members) {
          const user = await getUserByEmail(member.email);
          if (!user) {
            throw new Error("User not found");
          }
          users.push(user);
        }
        console.log(users);
        const updateData = {
          ...(name && { name }),
          ...(description && { description }),
          ...(status && { status }),
          ...(members && { members: users.map((user) => user) }),
          ...(issues && { issues }),
          updatedAt: new Date(),
        };
        const updatedProject = await updateProject(key, updateData);
        if (!updatedProject) {
          throw new Error("Failed to update project");
        }
        return updatedProject;
      } catch (err) {
        console.error(err);
      }
    },
    deleteProject: async (_parent: unknown, { key }: { key: string }) => {
      const project = await getProjectByKey(key);
      if (!project) {
        throw new Error("Project not found");
      }
      const success = await deleteProject({ key });
      if (!success) {
        throw new Error("Failed to delete project");
      }
      return project;
    },
  },
};
