/* 
 * In testing parlance these two exports would be called fixtures 
 * or test fixtures—static pieces of data you feed into your tests—and more specifically
 * mockUserData is a data fixture (sometimes called a “plain stub”).
 * mockUserDoc is a mock document or test double for a Mongoose document
 * i.e. a stub that has both the data fixture plus the methods (save, toObject) you need
 * to fully exercise your service logic.
 * It is a plain-object representing the shape of your UserInterface.
 * They let you isolate your unit under test (the service) from external dependencies (the real database model).
 */

import { Types } from "mongoose";
import { UserRole } from "../../mongoose/User/user.interface";
export const mockUserData = {
  _id: new Types.ObjectId("680a040d47df057ff7498102"),
  name: "John Doe",
  email: "john@example.com",
  password: "securepassword",
  role: UserRole.USER,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const mockUserDoc = {
  ...mockUserData,
  save: jest.fn().mockResolvedValue(undefined),
  toObject: jest.fn().mockReturnValue(mockUserData)
};