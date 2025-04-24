import gql from "graphql-tag";
export const attachmentTypeDefs = gql`
type Attachment {
  _id: ID!
  url: String!
  filename: String!
  size: Int!
  type: String!
  uploadedBy: User!
  issue: Issue!
  createdAt: DateTime!
}
`;