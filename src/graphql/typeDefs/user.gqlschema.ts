import gql from "graphql-tag";
import { userRoleEnumTypeDefs } from "./enums/userRole.enum";
export const userTypeDefs = gql`
${userRoleEnumTypeDefs}

type User {
    _id: ID
    name: String!
    email: String!
    password: String!
    role: UserRole!
    createdAt: String!
    updatedAt: String!
}
`;