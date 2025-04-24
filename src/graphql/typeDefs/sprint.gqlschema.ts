import gql from "graphql-tag";
import { sprintStatusEnumTypeDefs } from "./enums/sprintStatus.enum";
export const sprintTypeDefs = gql`
${sprintStatusEnumTypeDefs}
type Sprint {
    _id: ID!
    name: String!
    goal: String
    startDate: DateTime!
    endDate: DateTime!
    status: SprintStatus!
    project: Project!
    issues: [Issue!]!
    completedAt: DateTime
    velocity: Float # Calculated story points
}
`;

