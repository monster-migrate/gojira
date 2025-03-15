import mongoose, { model } from "mongoose";
import { ProjectSchema } from "./project.schema";
import { ProjectInterface } from "./project.interface";

export default mongoose.models.Project ||
  model<ProjectInterface>("Project", ProjectSchema);
