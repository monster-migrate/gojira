import gql from "graphql-tag";
export const commentTypeDefs = gql`
type Comment {
    _id: ID!
    content: String!
    author: User!
    issue: Issue!
    createdAt: DateTime!
    updatedAt: DateTime!
}
`;
