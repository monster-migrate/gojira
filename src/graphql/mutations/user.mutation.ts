import gql from "graphql-tag";

export const userMutations = gql`
type Mutation {
    createUser(
        name: String!
        email: String!
        password: String!
        role: UserRole!
    ): User!
    updateUser(
        name: String
        email: String
        password: String
        role: UserRole
    ): User!
    deleteUser(email: String!): User
}
  `;