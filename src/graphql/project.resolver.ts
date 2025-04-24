import { ProjectService } from "../../mongoose/Project/project.service";
import { authGuard } from "../../middleware/authguard";
import { ObjectId } from "mongoose";
import { Session } from "next-auth";
import { GraphQLError } from "graphql";
import { getUserByEmail } from "../../mongoose/User/user.services";
import { CreateProjectArgs } from "./mutations/project.mutation";
import { ProjectStatus } from "../../mongoose/Project/project.interface";
export const projectResolver = {
  Query: {
    projects: async (
      _parent: unknown,
      args: { first?: number; after?: string }
    ) => {
      // Default pagination values
      const limit = args.first ?? 10;
      // For offset-based pagination, 'after' can be a numeric offset or last ID
      const skip = args.after ? parseInt(args.after, 10) : 0;

      // Fetch projects with pagination
      return ProjectService.getAllProjects(1 + skip / limit, limit);
      // If you use offset/skip in your service, you could do:
      // return Project.find({}).skip(skip).limit(limit);
    },
    getProjectsByUserID: async (
      _parent: unknown,
      args: { userId: ObjectId }
    ) => {
      return ProjectService.getProjectsByUserID(args.userId)
    }
  },
  Mutation: {
    createProject: async (
      _parent: unknown,
      args: CreateProjectArgs,
      context: { session: Session | null }
    ) => {
      const user = context.session?.user;
      console.log("SESSION USER:", context.session?.user);

      // Ensure user is authenticated and session is valid
      if (!user || !user.fdlst_private_userId) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            http: { status: 401 },
            code: "UNAUTHENTICATED",
          },
        });
      }

      const { fdlst_private_userId, email, role } = user;

      const authorized = authGuard(
        { _id: fdlst_private_userId, email, role },
        context
      );

      if (authorized instanceof Error) throw authorized;

      if (!email) {
        throw new Error("User email is missing from session");
      }

      const currentUser = await getUserByEmail(email);
      // const owner = currentUser;

      return ProjectService.createProject({
        name: args.input.name,
        key: args.input.key,
        description: args.input.description,
        slug: args.input.name.toLowerCase().replace(/\s+/g, "-"),
        owner: currentUser._id,
        members: [],
        issues: [],
        sprints: [],
        backlog: [],
        boards: [],
        status: ProjectStatus.ACTIVE,
        isDeleted: false,
      });
    },
  },
};
