import gql from "graphql-tag";

export const issueTypeEnumTypeDefs = gql`
  enum IssueType {
  TASK
  BUG
  STORY
  EPIC
}`;