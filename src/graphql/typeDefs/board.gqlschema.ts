import gql from "graphql-tag";
import { issueStatusEnumTypeDefs } from "./enums/issueStatus.enum";
export const boardTypeDefs = gql`
${issueStatusEnumTypeDefs}

type Board {
    _id: ID!
    name: String!
    type: String! # "Scrum" or "Kanban"
    columns: [BoardColumn!]!
    project: Project!
    createdAt: DateTime!
    updatedAt: DateTime!
}
  
type BoardColumn {
    _id: ID!
    name: String!
    status: IssueStatus!
    issues: [Issue!]!
    order: Int!
}
`;