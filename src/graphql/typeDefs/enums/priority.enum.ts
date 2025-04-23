import gql from "graphql-tag";

export const priorityEnumTypeDefs = gql`
  enum Priority {
  LOWEST
  LOW
  MEDIUM
  HIGH
  CRITICAL
}`;