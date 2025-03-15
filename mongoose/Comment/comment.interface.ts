import { UserInterface } from "../User/user.interface";
import { IssueInterface } from "../Issue/issue.interface";

export interface CommentInterface {
  commentId: string;
  content: string;
  author: UserInterface;
  // issue: IssueInterface;
  createdAt: Date;
  updatedAt: Date;
  tags: String[];
}
