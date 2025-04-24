import {
  createUser,
  deleteUser,
  getUserByEmail,
  getAllUser,
  updateUser,
} from "../../mongoose/User/user.services";
import { UserRole } from "../../mongoose/User/user.interface";
import { authGuard } from "../../middleware/authguard";
import { Session } from "next-auth";

interface contextInterface {
  session: Session | null;
}
interface paramInterface {
  _id: string;
  email: string;
  role: string;
}
export const userResolver = {
  Query: {
    getUser: async (_parent: unknown, { email }: { email: string }) => {
      const user = await getUserByEmail(email);
      if (!user) throw new Error("User not found");
      return user;
    },
    getUsers: async () => await getAllUser(),
  },
  Mutation: {
    createUser: async (
      _parent: unknown,
      {
        name,
        email,
        password,
        role,
      }: { name: string; email: string; password: string; role: UserRole }
    ) => {
      const document = {
        name,
        email,
        password,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      console.log(document);
      const success = await createUser(document);
      if (!success) {
        throw new Error("Failed to create user");
      }
      return document;
    },
    updateUser: async (
      _parent: unknown,
      {
        name,
        email,
        role,
        password,
      }: { name?: string; email: string; role?: UserRole; password?: string }
    ) => {
      const updateData = {
        ...(name && { name }),
        ...(email && { email }),
        ...(role && { role }),
        ...(password && { password }),
        updatedAt: new Date(),
      };
      const updatedUser = await updateUser(email, updateData);
      if (!updatedUser) {
        throw new Error("Failed to update user");
      }

      return updatedUser;
    },
    deleteUser: async (_parent: unknown, param: paramInterface, context: contextInterface) => {
      const guard = authGuard(param, context)
      if (guard !== true) { return guard; }
      const user = await getUserByEmail(param.email);
      if (!user) {
        throw new Error("User not found");
      }
      console.log(user);
      const email = param.email;
      const success = await deleteUser({ email });
      if (!success) {
        throw new Error("Failed to delete user");
      }
      return user;
    },
  },
};
