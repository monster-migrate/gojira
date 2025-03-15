import { UserInterface } from "../User/user.interface";
import { IssueInterface } from "../Issue/issue.interface";

export enum ProjectStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  COMPLETED = "COMPLETED",
}

export interface ProjectInterface {
  name: string;
  description: string;
  key: string;
  owner: UserInterface;
  members: UserInterface[];
  issues: IssueInterface[];
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}
