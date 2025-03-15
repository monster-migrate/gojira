import Issue from "./issue.model";
import { IssueInterface } from "./issue.interface";

export const createIssue = async (data: IssueInterface) => {
  try {
    return await Issue.create(data);
  } catch (error) {
    throw new Error(`Error creating issue: ${error}`);
  }
};

export const getIssueById = async (issueId: string) => {
  try {
    return await Issue.findOne({ issueId: issueId });
  } catch (error) {
    throw new Error(`Error fetching issue: ${error}`);
  }
};
export const getAllIssues = async () => {
  try {
    return await Issue.find({});
  } catch (error) {
    throw new Error(`Error fetching issue: ${error}`);
  }
};

export const updateIssue = async (
  issueId: string,
  data: Partial<IssueInterface>
) => {
  try {
    return await Issue.findOneAndUpdate({ issueId: issueId }, data, {
      new: true,
    });
  } catch (error) {
    throw new Error(`Error updating issue: ${error}`);
  }
};

export const deleteIssue = async (issueId: string) => {
  try {
    return await Issue.findOneAndDelete({ issueId });
  } catch (error) {
    throw new Error(`Error deleting issue: ${error}`);
  }
};
