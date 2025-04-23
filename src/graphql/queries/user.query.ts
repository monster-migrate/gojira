import gql from "graphql-tag";
export const userQueries = gql`
type Query {
    getUser(email: String!): User
    getUsers: [User!]
}
`;