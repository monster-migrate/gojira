import gql from "graphql-tag";

export const profileMutations = gql`
  extend type Mutation {
    createProfile(
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
    ): Profile!

    updateProfile(
      userId: ID!
      name: String
      email: String
      role: UserRole
      organization: String
      department: String
      location: String
      mobile: String
      countryCode: String
      teams: [String]
    ): Profile!

    deleteProfile(userId: ID!): Profile
  }
`;