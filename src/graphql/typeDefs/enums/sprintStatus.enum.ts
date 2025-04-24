import gql from "graphql-tag";

export const sprintStatusEnumTypeDefs = gql`
  enum SprintStatus {
  PLANNED
  ACTIVE
  COMPLETED
}`;