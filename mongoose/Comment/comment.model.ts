import mongoose, { model } from "mongoose";
import { CommentInterface } from "./comment.interface";
import { CommentSchema } from "./comment.schema";

export default mongoose.models.Comment ||
  model<CommentInterface>("Comment", CommentSchema);
