import mongoose, { model } from "mongoose";
import { IssueInterface } from "./issue.interface";
import { IssueSchema } from "./issue.schema";

export default mongoose.models.Issue ||
  model<IssueInterface>("Issue", IssueSchema);
