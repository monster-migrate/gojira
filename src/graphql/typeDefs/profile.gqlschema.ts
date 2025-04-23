import gql from "graphql-tag";
import { userRoleEnumTypeDefs } from "./enums/userRole.enum";
export const profileTypeDefs = gql`
${userRoleEnumTypeDefs}

type Profile {
    userId: ID!
    name: String!
    email: String!
    role: UserRole!
    organization: String
    department: String
    location: String
    mobile: String
    countryCode: String
    teams: [String]
    createdAt: String
    updatedAt: String
}
`