import gql from "graphql-tag";

export const projectStatusEnumTypeDefs = gql`
  enum ProjectStatus {
  ACTIVE
  ARCHIVED
  COMPLETED
}`;