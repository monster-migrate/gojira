import gql from "graphql-tag";

export const projectMutations = gql`
input CreateProjectInput {
    name: String!
    description: String
    key: String!
  }

  input UpdateProjectInput {
    name: String
    description: String
    status: ProjectStatus
    endDate: DateTime
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project!
    
  }
  `;
export interface CreateProjectArgs {
  input: {
    name: string;
    key: string;
    description?: string;
  }
}
//   updateProject(key: String!, input: UpdateProjectInput!): Project!
//     deleteProject(key: String!): Boolean!