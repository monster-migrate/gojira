import Comment from "./comment.model";
import { CommentInterface } from "./comment.interface";
import { comment } from "postcss";

export const createComment = async (data: CommentInterface) => {
  try {
    return await Comment.create(data);
  } catch (error) {
    throw new Error(`Error creating comment: ${error}`);
  }
};

export const getCommentById = async (id: string) => {
  try {
    return await Comment.findOne({ commentId: id }).populate("author");
  } catch (error) {
    throw new Error(`Error fetching comment: ${error}`);
  }
};

export const updateComment = async (
  commentId: string,
  data: Partial<CommentInterface>
) => {
  try {
    const comment = await Comment.findOne({ commentId }).populate("author");
    if (!comment) {
      throw new Error("Comment not found");
    }
    Object.assign(comment, data);
    console.log(comment);
    await comment.save();
    return { ...comment.toObject(), ...data };
  } catch (error) {
    throw new Error(`Error updating comment: ${error}`);
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    return await Comment.findOneAndDelete({ commentId: commentId });
  } catch (error) {
    throw new Error(`Error deleting comment: ${error}`);
  }
};
