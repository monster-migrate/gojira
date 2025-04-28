import { Types } from "mongoose";

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  DEVELOPER = 'DEVELOPER',
  USER = 'USER',
  VIEWER = 'VIEWER',
}
export interface UserInterface {
  _id: Types.ObjectId
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
