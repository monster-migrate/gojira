import {
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
} from "../../mongoose/Comment/comment.service";
import { v4 as uuidv4 } from "uuid";
import { getUserByEmail } from "../../mongoose/User/user.services";

export const commentResolver = {
  Query: {
    getComment: async (_parent: unknown, { commentId }: { commentId: string }) => {
      const comment = await getCommentById(commentId);
      if (!comment) throw new Error("Comment not found");
      return comment;
    },
  },
  Mutation: {
    createComment: async (
      _parent: unknown,
      {
        content,
        author_email,
        // issue,
        tags,
      }: {
        content: string;
        author_email: string;
        tags: string[];
      }
    ) => {
      try {
        const user = await getUserByEmail(author_email);
        if (!user) {
          throw new Error("User not found");
        }
        const document = {
          commentId: uuidv4(),
          content,
          author: user,
          // issue,
          tags,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const success = await createComment(document);
        if (!success) throw new Error("Failed to create comment");
        return document;
      } catch (error) {
        throw new Error(`Error creating comment: ${error}`);
      }
    },
    updateComment: async (
      _parent: unknown,
      {
        commentId,
        content,
        tags,
      }: {
        commentId: string;
        content: string;
        tags: string[];
      }
    ) => {
      try {
        const existingComment = await getCommentById(commentId);
        if (!existingComment) throw new Error("Comment not found");
        const updateData: Partial<{ content: string; tags: string[]; updatedAt: Date }> = {
          ...(content && { content }),
          ...(tags && { tags }),
          updatedAt: new Date(),
        };
        const updatedComment = await updateComment(commentId, updateData);
        if (!updatedComment) throw new Error("Failed to update comment");
        return updatedComment;
      } catch (error) {
        throw new Error(`Error updating comment:${error}`);
      }
    },
    deleteComment: async (_parent: unknown, { commentId }: { commentId: string }) => {
      const comment = await getCommentById(commentId);
      if (!comment) throw new Error("Comment not found");
      const success = await deleteComment(commentId);
      if (!success) throw new Error("Failed to delete comment");
      return comment;
    },
  },
};
