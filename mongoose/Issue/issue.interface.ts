import { UserInterface } from "../User/user.interface";
import { ProjectInterface } from "../Project/project.interface";
import { CommentInterface } from "../Comment/comment.interface";

export enum IssueStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
}

export enum IssuePriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum IssueType {
  BUG = "BUG",
  FEATURE = "FEATURE",
  TASK = "TASK",
}

export interface IssueInterface {
  issueId: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  type: IssueType;
  reporter: UserInterface;
  assignee: UserInterface | null;
  project_key: String;
  comments: CommentInterface[];
  createdAt: Date;
  updatedAt: Date;
}
