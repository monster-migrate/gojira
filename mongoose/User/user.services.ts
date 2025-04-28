import User from "./user.model";
import { UserInterface } from "./user.interface";

export const createUser = async (data: Omit<UserInterface, "_id">) => {
  try {
    return await User.create(data);
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
};
export const getAllUser = async () => {
  try {
    return await User.find({});
  } catch (error) {
    throw new Error(`Error getting all users: ${error}`);
  }
};
export const getUserByEmail = async (email: string): Promise<UserInterface | null> => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error(
      `Error fetching user: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

export const updateUser = async (
  email: string,
  data: Partial<UserInterface>
) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    Object.assign(user, data);
    await user.save();
    return { ...user.toObject(), ...data };
  } catch (error) {
    throw new Error(`Error updating user: ${error}`);
  }
};

export const deleteUser = async ({
  email,
}: {
  email: string;
}): Promise<boolean> => {
  try {
    await User.deleteOne({ email: email });
    return true;
  } catch (error) {
    throw new Error(`Error deleting user: ${error}`);
  }
};
