import mongoose, { model, Schema } from "mongoose";
import { CommentInterface } from "./comment.interface";

export const CommentSchema = new mongoose.Schema<CommentInterface>(
  {
    commentId: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // issue: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Issue",
    //   required: true,
    // },
    tags: [{ type: String, trim: true, minlength: 1 }],
  },
  { timestamps: true }
)
  .index({ author: 1 })
  .index({ issue: 1 });
