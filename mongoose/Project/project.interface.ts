import { Types } from "mongoose";
// import { SprintInterface } from "../Sprint/sprint.interface";
// import { BoardInterface } from "../Board/board.interface";
// import { ProjectUserInterface } from "../ProjectUser/projectUser.interface";

export enum ProjectStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  COMPLETED = "COMPLETED",
}

export interface ProjectInterface {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  key: string;
  slug: string;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  owner: Types.ObjectId;
  members: Types.ObjectId[];
  issues: Types.ObjectId[];
  sprints: Types.ObjectId[];
  backlog: Types.ObjectId[];
  boards: Types.ObjectId[];
  isDeleted: boolean;
  status: ProjectStatus;
}