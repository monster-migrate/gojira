import gql from "graphql-tag";
import { issueTypeEnumTypeDefs } from "./enums/issueType.enum";
import { issueStatusEnumTypeDefs } from "./enums/issueStatus.enum";
import { priorityEnumTypeDefs } from "./enums/priority.enum";
import { commentTypeDefs } from "./comment.gqlschema";
import { attachmentTypeDefs } from "./attachment.gqlschema";
import { sprintTypeDefs } from "./sprint.gqlschema";
export const issueTypeDefs = gql`
${issueTypeEnumTypeDefs}
${issueStatusEnumTypeDefs}
${priorityEnumTypeDefs}
${commentTypeDefs}
${attachmentTypeDefs}
${sprintTypeDefs}

type Issue {
  _id: ID!
  key: String! 
  title: String!
  description: String
  type: IssueType! 
  status: IssueStatus! 
  priority: Priority!
  storyPoints: Int
  estimate: Float # Hours
  dueDate: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
  reporter: User!
  assignee: User
  sprint: Sprint
  project: Project!
  comments: [Comment!]!
  attachments: [Attachment!]!
  labels: [String!]
  isDeleted: Boolean
}
`;