import gql from "graphql-tag";
import { userTypeDefs } from "./user.gqlschema";
export const projectTypeDefs = gql`

type Project {
  _id: ID!
  name: String!
  description: String
  key: String! @unique # Short project identifier (e.g., "APP")
  slug: String! @unique # URL-friendly identifier
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
  isDeleted: Boolean @default(value: false)
}
`;