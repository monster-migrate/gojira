import gql from "graphql-tag";
import { userRoleEnumTypeDefs } from "./enums/userRole.enum";
import { sprintTypeDefs } from "./sprint.gqlschema";
import { issueTypeDefs } from "./issue.gqlschema";
import { boardTypeDefs } from "./board.gqlschema";
import { dateTimeScalarTypeDefs } from "./scalars/dateTime.scalar";
import { projectStatusEnumTypeDefs } from "./enums/projectStatus.enum";
export const projectTypeDefs = gql`
${dateTimeScalarTypeDefs}
${userRoleEnumTypeDefs}
${sprintTypeDefs}
${issueTypeDefs}
${boardTypeDefs}
${projectStatusEnumTypeDefs}
type Project {
  _id: ID!
  name: String!
  description: String
  key: String! 
  slug: String!
  startDate: DateTime
  endDate: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
  owner: User! # Reference to User schema
  members: [ProjectUser!]!
  issues: [Issue!]!
  sprints: [Sprint!]!
  backlog: [Issue!]! # Issues not in any sprint
  boards: [Board!]!
  isDeleted: Boolean
  status: ProjectStatus
}

type ProjectUser {
  _id: ID!
  project: Project!
  user: User!
  role: UserRole!
  joinedAt: DateTime!
}
`;