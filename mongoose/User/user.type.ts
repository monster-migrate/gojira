import { UserRole } from "./user.interface";
import { IssueInterface } from "../Issue/issue.interface";
import { CommentInterface } from "../Comment/comment.interface";
export type UserType = {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    assignedIssues: IssueInterface[];
    comments: CommentInterface[];
  }