import gql from "graphql-tag";
export const projectQueries = gql`
input ProjectOrderByInput {
  createdAt: SortOrder
  updatedAt: SortOrder
  endDate: SortOrder
}

enum SortOrder {
  ASC
  DESC
}

type Query {
  projects(first: Int, after: String): [Project]!
  getProjectsByUserID(userId: ID, orderBy: ProjectOrderByInput) : [Project]!
  getProjectById(projectId: ID): Project
}
`;