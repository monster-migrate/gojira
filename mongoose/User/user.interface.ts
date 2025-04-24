import { ObjectId } from "mongoose";
import { IssueInterface } from "../Issue/issue.interface";

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  DEVELOPER = 'DEVELOPER',
  USER = 'USER',
  VIEWER = 'VIEWER',
}
export interface UserInterface {
  _id: ObjectId
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
