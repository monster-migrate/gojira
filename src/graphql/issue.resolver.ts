import {
  IssuePriority,
  IssueStatus,
  IssueType,
} from "../../mongoose/Issue/issue.interface";
import {
  createIssue,
  getIssueById,
  getAllIssues,
  updateIssue,
  deleteIssue,
} from "../../mongoose/Issue/issue.service";
import { v4 as uuidv4 } from "uuid";
import { getUserByEmail } from "../../mongoose/User/user.services";
import { getProjectByKey } from "../../mongoose/Project/project.service";
import { UserInterface } from "../../mongoose/User/user.interface";
export const issueResolver = {
  Query: {
    getIssue: async (_: any, { issue_id }: { issue_id: string }) => {
      const issue = await getIssueById(issue_id);
      if (!issue) throw new Error("Issue not found");
      return issue;
    },
    getIssues: async () => await getAllIssues(),
  },
  Mutation: {
    createIssue: async (
      _: any,
      {
        title,
        description,
        status,
        priority,
        type,
        reporterEmail,
        assigneeEmail,
        projectKey,
      }: {
        title: string;
        description: string;
        status: IssueStatus;
        priority: IssuePriority;
        type: IssueType;
        reporterEmail: string;
        assigneeEmail: string;
        projectKey: string;
      }
    ) => {
      const reporter = await getUserByEmail(reporterEmail);
      const assignee = null;
      if (assigneeEmail != null) {
        const assignee = await getUserByEmail(assigneeEmail);
        if (!assignee) {
          throw new Error("Assignee not found");
        }
      }
      const project = await getProjectByKey(projectKey);
      if (!reporter) {
        throw new Error("Reporter not found");
      }
      if (!project) {
        throw new Error("Project not found");
      }
      const document = {
        issueId: uuidv4(),
        title,
        description,
        status,
        priority,
        type,
        reporter,
        assignee,
        project_key: project.key,
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const success = await createIssue(document);
      if (!success) {
        throw new Error(`Failed to create issue: ${success}`);
      }
      return document;
    },
    updateIssue: async (
      _: any,
      {
        issueId,
        title,
        description,
        status,
        priority,
        type,
        assigneeEmail,
      }: {
        issueId: string;
        title: string;
        description: string;
        status: IssueStatus;
        priority: IssuePriority;
        type: IssueType;
        assigneeEmail: string;
      }
    ) => {
      const assignee = await getUserByEmail(assigneeEmail);
      if (!assignee) {
        throw new Error("Assignee not found");
      }
      const updateData = {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status }),
        ...(priority && { priority }),
        ...(type && { type }),
        ...(assignee && { assignee }),
        updatedAt: new Date(),
      };
      const updatedIssue = await updateIssue(issueId, updateData);
      if (!updatedIssue) {
        throw new Error("Failed to update issue");
      }
      return updatedIssue;
    },
    deleteIssue: async (_: any, { issueId }: { issueId: string }) => {
      const issue = await getIssueById(issueId);
      if (!issue) {
        throw new Error("Issue not found");
      }
      const success = await deleteIssue(issueId);
      if (!success) {
        throw new Error("Failed to delete issue");
      }
      return issue;
    },
  },
};
