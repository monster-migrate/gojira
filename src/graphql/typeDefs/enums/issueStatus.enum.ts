import gql from "graphql-tag";

export const issueStatusEnumTypeDefs = gql`
  enum IssueStatus {
  TASK
  BUG
  STORY
  EPIC
}`;