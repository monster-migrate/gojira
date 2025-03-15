import { CommentInterface } from "../Comment/comment.interface";
import { ProjectInterface } from "../Project/project.interface";
import { UserInterface } from "../User/user.interface";
import { IssuePriority, IssueStatus } from "./issue.interface";

export type IssueType = {
  issueId: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  type: IssueType;
  reporter: UserInterface;
  assignee: UserInterface;
  project: ProjectInterface;
  comments: CommentInterface[];
  createdAt: Date;
  updatedAt: Date;
};
