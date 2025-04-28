import { createUser, deleteUser, getAllUser, getUserByEmail, updateUser } from "../../../../mongoose/User/user.services";
import User from "../../../../mongoose/User/user.model";
import { UserRole } from "../../../../mongoose/User/user.interface";
import { mockUserData, mockUserDoc } from "../../../../helpers/__mocks__/mockUserData";

jest.mock("../../../../mongoose/User/user.model");

describe("createUser Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user successfully", async () => {
    (User.create as jest.Mock).mockResolvedValue(mockUserData);
    const result = await createUser(mockUserData);
    expect(User.create).toHaveBeenCalledWith(mockUserData);
    expect(result).toEqual(mockUserData);
  });

  it("should throw an error when creation fails", async () => {
    (User.create as jest.Mock).mockRejectedValue(new Error("DB error"));
    await expect(createUser(mockUserData)).rejects.toThrow("Error creating user: Error: DB error");
  });

  it("should throw an error for invalid role", async () => {
    const invalidUserData = {
      ...mockUserData,
      role: "INVALID_ROLE" as UserRole, // Force invalid value
    };

    const validationError = new Error("Validation failed: role: Invalid enum value");
    (User.create as jest.Mock).mockRejectedValue(validationError);

    await expect(createUser(invalidUserData))
      .rejects
      .toThrow("Error creating user: Error: Validation failed: role: Invalid enum value");
  });
  it("should throw an error for duplicate email", async () => {
    const duplicateKeyError = new Error('E11000 duplicate key error collection: test.users index: email_1 dup key');
    (User.create as jest.Mock).mockRejectedValue(duplicateKeyError);

    await expect(createUser(mockUserData))
      .rejects
      .toThrow("Error creating user: Error: E11000 duplicate key error collection: test.users index: email_1 dup key");
  });
  it("should throw an error for unknown error types", async () => {
    (User.create as jest.Mock).mockRejectedValue("Some unknown error");

    await expect(createUser(mockUserData))
      .rejects
      .toThrow("Error creating user: Some unknown error");
  });
  it("should throw an error when required fields are missing", async () => {
    const incompleteUserData = {
      name: "John Doe",
      password: "securepassword",
      role: UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const validationError = new Error("Validation failed: email: Path `email` is required.");
    (User.create as jest.Mock).mockRejectedValue(validationError);

    await expect(createUser(incompleteUserData as any))
      .rejects
      .toThrow("Error creating user: Error: Validation failed: email: Path `email` is required.");
  });
  it("should throw an error for completely invalid input type", async () => {
    (User.create as jest.Mock).mockRejectedValue(new Error("Validation failed: name: Cast to String failed"));

    await expect(createUser({} as any))
      .rejects
      .toThrow("Error creating user: Error: Validation failed: name: Cast to String failed");
  });
});

describe("updateUser service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should update User data", async () => {
    const email = "john@example.com";

    const mockUpdateData = {
      name: "Jane Doe",
      email: "janedoe@example.com",
    };
    (User.findOne as jest.Mock).mockResolvedValue(mockUserDoc);
    const result = await updateUser(email, mockUpdateData);
    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(mockUserDoc.save).toHaveBeenCalled();
    expect(mockUserDoc.toObject).toHaveBeenCalled();
    expect(result).toEqual({
      ...mockUserDoc.toObject(),
      ...mockUpdateData,
    });
  });

  it("should throw an error if user not found", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await expect(updateUser("notfound@example.com", {}))
      .rejects
      .toThrow("Error updating user: Error: User not found");
  });

  it("should throw an error if save fails", async () => {
    const email = "john@example.com";
    const mockUserData = {
      name: "John Doe",
      email,
      password: "securepassword",
      role: UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
      save: jest.fn().mockRejectedValue(new Error("Save failed")),
      toObject: jest.fn().mockReturnValue({}),
    };

    (User.findOne as jest.Mock).mockResolvedValue(mockUserData);

    await expect(updateUser(email, { name: "New Name" }))
      .rejects
      .toThrow("Error updating user: Error: Save failed");
  });
})

describe("deleteUser service", () => {
  it("should return true after deleting the user", async () => {
    const email = "john@example.com";
    (User.deleteOne as jest.Mock).mockResolvedValue(true);
    const result = await deleteUser({ email });
    expect(User.deleteOne).toHaveBeenCalledWith({ email: email });
    expect(result).toEqual(true);
  })
})