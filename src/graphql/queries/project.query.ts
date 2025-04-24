import gql from "graphql-tag";
export const projectQueries = gql`
type Query {
  projects(first: Int, after: String): [Project]!
  getProjectsByUserID(userId: ID) : [Project]!
}
`;